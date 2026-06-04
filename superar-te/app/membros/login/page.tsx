"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/src/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = getSupabase();
    if (!supabase) {
      setError("Erro de configuração do Supabase.");
      setLoading(false);
      return;
    }

    const { data, error: signError } = await supabase.auth.signInWithPassword({ email, password });
    if (signError) {
      setError(signError.message);
      setLoading(false);
      return;
    }

    router.push("/membros/dashboard");
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-md rounded-xl border border-white/10 bg-white/5 p-8">
        <h1 className="mb-4 text-2xl font-black">Área de Membros — Login</h1>
        {error && <div className="mb-4 rounded p-3 bg-red-500/10 text-red-400">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="E-mail" required className="w-full rounded px-4 py-3 bg-black/50" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Senha" required className="w-full rounded px-4 py-3 bg-black/50" />
          <button type="submit" disabled={loading} className="w-full rounded-full bg-lime-400 px-4 py-3 font-black text-black">{loading ? 'Entrando...' : 'Entrar'}</button>
        </form>
        <div className="mt-4 space-y-2 text-sm text-white/70">
          <Link href="/membros/recuperar" className="text-lime-400 hover:text-lime-300 block">Esqueceu sua senha?</Link>
          <Link href="/inscricao" className="text-lime-400 hover:text-lime-300 block">Não tem cadastro? Inscreva-se aqui.</Link>
        </div>
      </div>
    </main>
  );
}
