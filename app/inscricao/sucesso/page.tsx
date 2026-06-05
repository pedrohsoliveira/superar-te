"use client";

import { useEffect, useState } from "react";

interface InscricaoDados {
  nomeCompleto: string;
  cpf: string;
  endereco: string;
  dataNascimento: string;
  email: string;
  username: string;
}

export default function SucessoInscricao() {
  const [dados, setDados] = useState<InscricaoDados | null>(null);

  useEffect(() => {
    const inscricao = localStorage.getItem("inscricao");
    if (inscricao) {
      setDados(JSON.parse(inscricao));
    }
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="/" className="text-base font-black tracking-[0.3em] sm:text-xl">
            SUPERAR-TE
          </a>
        </div>
      </header>

      <section className="flex min-h-screen items-center px-4 pt-28 sm:px-6">
        <div className="w-full max-w-2xl mx-auto">
          <div className="rounded-[2rem] border border-lime-400/30 bg-lime-400/5 p-6 shadow-2xl backdrop-blur-md sm:p-10 lg:p-14 text-center">
            {/* Ícone de sucesso */}
            <div className="mb-6 inline-block rounded-full bg-lime-400/20 p-6">
              <svg
                className="h-16 w-16 text-lime-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h1 className="text-5xl font-black mb-4">Inscrição Confirmada!</h1>

            <p className="text-lg text-white/80 mb-8">
              Parabéns! Sua inscrição no desafio SUPERAR-TE foi realizada com sucesso.
            </p>

            {dados && (
              <div className="mb-8 rounded-lg border border-white/10 bg-white/5 p-6 text-left">
                <h2 className="text-xl font-bold mb-4 text-lime-400">
                  Dados da sua inscrição:
                </h2>
                <div className="space-y-3 text-white/80">
                  <p>
                    <span className="font-bold text-white">Nome:</span> {dados.nomeCompleto}
                  </p>
                  <p>
                    <span className="font-bold text-white">CPF:</span> {dados.cpf}
                  </p>
                  <p>
                    <span className="font-bold text-white">Endereço:</span> {dados.endereco}
                  </p>
                  <p>
                    <span className="font-bold text-white">Data de Nascimento:</span>{" "}
                    {new Date(dados.dataNascimento).toLocaleDateString("pt-BR")}
                  </p>
                  <p>
                    <span className="font-bold text-white">E-mail:</span> {dados.email}
                  </p>
                  <p>
                    <span className="font-bold text-white">Usuário:</span> {dados.username}
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <p className="text-white/70">
                Você receberá um e-mail de confirmação com as próximas etapas e instruções para começar o desafio.
              </p>

              <div className="rounded-lg border border-lime-400/30 bg-lime-400/10 p-4">
                <p className="font-bold text-lime-400 mb-2">✓ Próximos passos:</p>
                <ul className="text-sm text-white/80 space-y-2 text-left">
                  <li>✓ Verificar seu e-mail de confirmação</li>
                  <li>✓ Realizar login no painel do atleta</li>
                  <li>✓ Baixar o kit SUPERAR-TE</li>
                  <li>✓ Unir-se à comunidade exclusiva</li>
                </ul>
              </div>

              <a
                href="/"
                className="inline-block rounded-full bg-lime-400 px-8 py-4 text-lg font-black text-black transition hover:bg-lime-300"
              >
                Voltar para Home
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
