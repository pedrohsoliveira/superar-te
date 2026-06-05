import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      nome_completo,
      whatsapp,
      email,
      cidade,
      modalidade,
      tamanho_camisa,
      observacoes,
    } = body;

    if (!nome_completo || !whatsapp || !email || !modalidade || !tamanho_camisa) {
      return NextResponse.json(
        { error: "Campos obrigatórios faltando." },
        { status: 400 }
      );
    }

    let supabaseAdmin;
    try {
      supabaseAdmin = getSupabaseAdmin();
    } catch (envError) {
      return NextResponse.json(
        { error: "Missing Supabase environment variables." },
        { status: 500 }
      );
    }

    const { error } = await supabaseAdmin.from("inscricoes").insert([
      {
        nome_completo,
        whatsapp,
        email,
        cidade: cidade || null,
        modalidade,
        tamanho_camisa,
        observacoes: observacoes || null,
      },
    ]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Inscrição registrada com sucesso." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erro inesperado ao processar inscrição." },
      { status: 500 }
    );
  }
}
