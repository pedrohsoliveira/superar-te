import { NextResponse } from "next/server";
import { getSupabase } from "@/src/lib/supabaseClient";
import { getTituloPagamento, getValorInscricao } from "@/src/lib/mercadopago";

const MERCADOPAGO_ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export async function POST(request: Request) {
  if (!MERCADOPAGO_ACCESS_TOKEN) {
    return NextResponse.json(
      { error: "Mercado Pago não configurado." },
      { status: 500 }
    );
  }

  const body = await request.json();
  const {
    nome,
    data_nascimento,
    cpf,
    endereco_completo,
    email,
    whatsapp,
    tipo_inscricao,
  } = body;

  if (!nome || !data_nascimento || !cpf || !endereco_completo || !email || !whatsapp || !tipo_inscricao) {
    return NextResponse.json(
      { error: "Todos os campos do formulário são obrigatórios." },
      { status: 400 }
    );
  }

  const supabase = getSupabase(true);
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase não configurado no servidor." },
      { status: 500 }
    );
  }

  let valor_inscricao: number;
  try {
    valor_inscricao = getValorInscricao(tipo_inscricao);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }

  const { data: inscricao, error: insertError } = await supabase
    .from("inscricoes")
    .insert([
      {
        nome,
        data_nascimento,
        cpf,
        endereco_completo,
        email,
        whatsapp,
        tipo_inscricao,
        valor_inscricao,
        frete_cobrado: false,
        status: "PENDENTE",
      },
    ])
    .select("id")
    .single();

  if (insertError || !inscricao?.id) {
    return NextResponse.json(
      { error: insertError?.message || "Erro ao salvar inscrição." },
      { status: 500 }
    );
  }

  const title = getTituloPagamento(tipo_inscricao);

  const checkoutResponse = await fetch(
    "https://api.mercadopago.com/checkout/preferences",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${MERCADOPAGO_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          {
            title,
            quantity: 1,
            unit_price: valor_inscricao,
          },
        ],
        payer: {
          name: nome,
          email,
          phone: {
            area_code: whatsapp.replace(/\D/g, "").slice(0, 2),
            number: whatsapp.replace(/\D/g, "").slice(2),
          },
        },
        external_reference: inscricao.id,
        back_urls: {
          success: `${APP_URL}/inscricao/sucesso`,
          failure: `${APP_URL}/inscricao`,
          pending: `${APP_URL}/inscricao`,
        },
        auto_return: "approved",
      }),
    }
  );

  const preferenceJson = await checkoutResponse.json();
  if (!checkoutResponse.ok) {
    return NextResponse.json(
      {
        error:
          preferenceJson.message ||
          "Erro ao criar preferência de pagamento no Mercado Pago.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    init_point: preferenceJson.init_point,
    preference_id: preferenceJson.id,
  });
}
