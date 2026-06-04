"use client";

import Link from "next/link";

export default function InscricaoSucesso() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="flex min-h-screen items-center px-4 pt-28 sm:px-6">
        <div className="w-full max-w-2xl mx-auto">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-2xl">
            <h1 className="mb-4 text-4xl font-black">Inscrição realizada!</h1>
            <p className="mb-6 text-white/70">Sua inscrição foi registrada com sucesso. Em breve entraremos em contato.</p>
            <Link href="/" className="inline-block rounded-full bg-lime-400 px-6 py-3 font-black text-black">Voltar para a página principal</Link>
          </div>
        </div>
      </section>
    </main>
  );
}