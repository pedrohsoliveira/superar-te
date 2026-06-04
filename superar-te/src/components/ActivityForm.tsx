"use client";

import React, { useState } from "react";
import { getSupabase } from "@/src/lib/supabaseClient";

export default function ActivityForm({ userId, onAdded }: { userId: string; onAdded?: () => void }) {
  const [date, setDate] = useState("");
  const [distance, setDistance] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = getSupabase();
    if (!supabase) {
      setError("Supabase não configurado.");
      setLoading(false);
      return;
    }

    const { error: insertError } = await supabase.from("atividades").insert([{ user_id: userId, date, distance: Number(distance), notes }]);
    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    setDate("");
    setDistance("");
    setNotes("");
    setLoading(false);
    if (onAdded) onAdded();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && <div className="text-red-400">{error}</div>}
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="w-full rounded px-3 py-2 bg-black/50" />
      <input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} placeholder="Distância (km)" required className="w-full rounded px-3 py-2 bg-black/50" />
      <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Observações" className="w-full rounded px-3 py-2 bg-black/50" />
      <button type="submit" disabled={loading} className="rounded bg-lime-400 px-4 py-2 font-black text-black">{loading ? 'Salvando...' : 'Adicionar atividade'}</button>
    </form>
  );
}
