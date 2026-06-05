"use client";

import React, { useState } from "react";
import { getSupabase } from "@/src/lib/supabaseClient";

export default function UploadForm({ userId }: { userId: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!file) return setError("Selecione um arquivo.");

    const supabase = getSupabase();
    if (!supabase) return setError("Supabase não configurado.");

    setLoading(true);
    const path = `${userId}/${Date.now()}_${file.name}`;

    const { data, error: uploadError } = await supabase.storage
      .from("uploads")
      .upload(path, file!, { cacheControl: "3600", upsert: false });
    if (uploadError) {
      setError(uploadError.message);
      setLoading(false);
      return;
    }

    await supabase.from("uploads").insert([{ user_id: userId, path: data.path, file_name: file.name }]);

    setSuccess("Arquivo enviado com sucesso.");
    setFile(null);
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && <div className="text-red-400">{error}</div>}
      {success && <div className="text-lime-400">{success}</div>}
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      <button type="submit" disabled={loading} className="rounded bg-lime-400 px-4 py-2 font-black text-black">{loading ? 'Enviando...' : 'Enviar arquivo'}</button>
    </form>
  );
}
