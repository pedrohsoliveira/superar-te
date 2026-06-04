"use client";

import Link from "next/link";
import { useState } from "react";
import { getSupabase } from "@/src/lib/supabaseClient";

export default function RecoverPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const supabase = getSupabase();
    if (!supabase) {
      setError("Erro de configuração do Supabase.");
      setLoading(false);
      return;
    }

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/membros/login",
    });

    if (resetError) {
      setError(resetError.message);
      setLoading(false);
      return;
    }

    setMessage("Enviamos um link de redefinição para seu e-mail.");
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border border-white/10 bg-white/5 p-8">
        <h1 className="mb-4 text-2xl font-black">Recuperar senha</h1>
        <p className="mb-6 text-white/70">Informe seu e-mail para receber o link de redefinição de senha.</p>

        {error && <div className="mb-4 rounded p-3 bg-red-500/10 text-red-400">{error}</div>}
        {message && <div className="mb-4 rounded p-3 bg-lime-400/10 text-lime-400">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            placeholder="E-mail"
            className="w-full rounded px-4 py-3 bg-black/50"
          />
          <button type="submit" disabled={loading} className="w-full rounded-full bg-lime-400 px-4 py-3 font-black text-black">
            {loading ? "Enviando..." : "Enviar link de recuperação"}
          </button>
        </form>
        <div className="mt-4 text-sm text-white/70">
          <Link href="/membros/login" className="text-lime-400 hover:text-lime-300">Voltar ao login</Link>
        </div>
      </div>
    </main>
  );
}
