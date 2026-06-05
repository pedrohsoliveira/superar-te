import { NextResponse } from "next/server";
import { getSupabase } from "@/src/lib/supabaseClient";

const MERCADOPAGO_ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN;

export async function POST(request: Request) {
  if (!MERCADOPAGO_ACCESS_TOKEN) {
    return NextResponse.json(
      { error: "Mercado Pago não configurado." },
      { status: 500 }
    );
  }

  const body = await request.json();
  const paymentId = body?.data?.id || body?.id;

  if (!paymentId) {
    return NextResponse.json(
      { error: "Identificador de pagamento ausente." },
      { status: 400 }
    );
  }

  const paymentResponse = await fetch(
    `https://api.mercadopago.com/v1/payments/${paymentId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${MERCADOPAGO_ACCESS_TOKEN}`,
      },
    }
  );

  if (!paymentResponse.ok) {
    const errorBody = await paymentResponse.text();
    return NextResponse.json(
      { error: `Falha ao consultar pagamento: ${errorBody}` },
      { status: 500 }
    );
  }

  const paymentData = await paymentResponse.json();
  const externalReference = paymentData.external_reference;

  if (!externalReference) {
    return NextResponse.json(
      { error: "Referência externa ausente no pagamento." },
      { status: 400 }
    );
  }

  const statusToSave = paymentData.status === "approved" ? "PAGO" : paymentData.status;

  const supabase = getSupabase(true);
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase não configurado no servidor." },
      { status: 500 }
    );
  }

  const { error } = await supabase
    .from("inscricoes")
    .update({
      status: statusToSave,
      mercadopago_status: paymentData.status,
      mercadopago_payment_id: paymentData.id,
    })
    .eq("id", externalReference);

  if (error) {
    return NextResponse.json(
      { error: error.message || "Erro ao atualizar inscrição." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
