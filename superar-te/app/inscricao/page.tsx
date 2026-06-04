"use client";

import InscricaoForm from "@/src/components/InscricaoForm";

export default function InscricaoPage() {
  return (
    <main className="min-h-screen bg-black text-white px-4 py-28">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-black">Inscreva-se no SUPERAR-TE</h1>
          <p className="mt-4 text-white/70">Dê o primeiro passo para completar seus 100 km em 60 dias.</p>
        </div>

        <div className="space-y-6 rounded-[2rem] border border-white/10 bg-white/5 p-8">
          <InscricaoForm submitLabel={"Confirmar Inscrição"} redirectTo={"/inscricao/sucesso"} />
        </div>
      </div>
    </main>
  );
}
