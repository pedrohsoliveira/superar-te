"use client";

import InscricaoForm from "@/src/components/InscricaoForm";

export default function InscricaoPage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden px-4 py-28">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-black tracking-tight sm:text-6xl">Inscreva-se no SUPERAR-TE</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-white/70">
            Dê o primeiro passo para completar seus 100 km em 60 dias.
          </p>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.25)] sm:p-10">
          <InscricaoForm submitLabel={"Confirmar Inscrição"} redirectTo={"/inscricao/sucesso"} />
        </div>
      </div>
    </main>
  );
}
