"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/src/lib/supabaseClient";
import ActivityForm from "@/src/components/ActivityForm";
import UploadForm from "@/src/components/UploadForm";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [atividades, setAtividades] = useState<any[]>([]);
  const [uploads, setUploads] = useState<any[]>([]);

  async function load() {
    const supabase = getSupabase();
    if (!supabase) return;

    const { data: sessionData } = await supabase.auth.getUser();
    const currentUser = sessionData?.user ?? null;
    setUser(currentUser);

    if (!currentUser) return;

    const { data: acts } = await supabase.from("atividades").select("*").eq("user_id", currentUser.id).order("date", { ascending: false });
    setAtividades(acts ?? []);

    const { data: ups } = await supabase.from("uploads").select("*").eq("user_id", currentUser.id).order("created_at", { ascending: false });
    const uploadsData = ups ?? [];
    const signedUploads = await Promise.all(
      uploadsData.map(async (upload: any) => {
        const { data: signedUrlData, error: urlError } = await supabase.storage
          .from("uploads")
          .createSignedUrl(upload.path, 60 * 60);
        return {
          ...upload,
          signedUrl: urlError ? "" : signedUrlData?.signedUrl ?? "",
        };
      })
    );
    setUploads(signedUploads);
  }

  const router = useRouter();

  async function handleLogout() {
    const supabase = getSupabase();
    if (!supabase) return;

    await supabase.auth.signOut();
    router.push("/membros/login");
  }

  useEffect(() => { load(); }, []);

  if (!user) return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="p-6">Você precisa <a href="/membros/login" className="text-lime-400">entrar</a> para acessar o painel.</div>
    </main>
  );

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-black">Bem-vindo, {user?.user_metadata?.nome ?? user.email}</h1>
          <button onClick={handleLogout} className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10">
            Logout
          </button>
        </div>

        <section className="mb-8">
          <h2 className="font-bold mb-2">Lançar atividade</h2>
          <ActivityForm userId={user.id} onAdded={() => load()} />
        </section>

        <section className="mb-8">
          <h2 className="font-bold mb-2">Seus uploads</h2>
          <UploadForm userId={user.id} />
          <ul className="mt-4 space-y-2">
            {uploads.map((u) => (
              <li key={u.id} className="text-sm">
                {u.file_name} — {u.signedUrl ? (
                  <a href={u.signedUrl} target="_blank" rel="noreferrer" className="text-lime-400">Abrir</a>
                ) : (
                  <span className="text-white/60">Link indisponível</span>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-bold mb-2">Atividades</h2>
          <ul className="space-y-2">
            {atividades.map((a) => (
              <li key={a.id} className="rounded p-3 bg-white/5">{a.date} — {a.distance} km — {a.notes}</li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
