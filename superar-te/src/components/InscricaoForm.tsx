"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/src/lib/supabaseClient";

type Props = {
  submitLabel?: string;
  redirectTo?: string;
  onSuccess?: () => void;
};

export default function InscricaoForm({
  submitLabel = "Confirmar Inscrição",
  redirectTo,
  onSuccess,
}: Props) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nome: "",
    data_nascimento: "",
    cpf: "",
    endereco_completo: "",
    email: "",
    whatsapp: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const cpfClean = formData.cpf.replace(/\D/g, "");

    if (cpfClean.length !== 11) {
      setError("CPF inválido. Use 11 dígitos.");
      setLoading(false);
      return;
    }

    const supabase = getSupabase();

    if (!supabase) {
      setError("Erro ao conectar com o banco de dados.");
      setLoading(false);
      return;
    }

    const inscricao = {
      nome: formData.nome,
      data_nascimento: formData.data_nascimento,
      cpf: cpfClean,
      endereco_completo: formData.endereco_completo,
      email: formData.email,
      whatsapp: formData.whatsapp,
    };

    const { error: sbError } = await supabase
      .from("inscricoes")
      .insert([inscricao]);

    if (sbError) {
      if (sbError.message.includes("inscricoes_cpf_idx")) {
        setError("Este CPF já está inscrito no desafio.");
     } else {
       setError(`Erro Supabase: ${sbError.message}`);
     }

     setLoading(false);
     return;
   }

    setLoading(false);

    if (onSuccess) onSuccess();

    if (redirectTo) {
      router.push(redirectTo);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="nome"
        value={formData.nome}
        onChange={handleChange}
        type="text"
        required
        placeholder="Nome completo"
        className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-lime-400"
      />

      <input
        name="data_nascimento"
        value={formData.data_nascimento}
        onChange={handleChange}
        type="date"
        required
        className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-lime-400"
      />

      <input
        name="cpf"
        value={formData.cpf}
        onChange={handleChange}
        type="text"
        required
        placeholder="CPF"
        className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-lime-400"
      />

      <textarea
        name="endereco_completo"
        value={formData.endereco_completo}
        onChange={handleChange}
        required
        placeholder="Endereço completo"
        rows={3}
        className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-lime-400"
      />

      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        type="email"
        required
        placeholder="E-mail"
        className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-lime-400"
      />

      <input
        name="whatsapp"
        value={formData.whatsapp}
        onChange={handleChange}
        type="tel"
        required
        placeholder="WhatsApp"
        className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-lime-400"
      />

      {error && (
        <p className="rounded-xl bg-red-500/10 p-3 text-sm text-red-400">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-lime-400 px-6 py-4 font-black text-black transition hover:scale-105 hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "ENVIANDO..." : submitLabel}
      </button>
    </form>
  );
}