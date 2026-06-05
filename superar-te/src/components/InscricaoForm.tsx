"use client";

import React, { useState } from "react";
import {
  pagamentoOptions,
  TipoInscricao,
  getValorInscricao,
} from "@/src/lib/mercadopago";

type FormData = {
  nome: string;
  data_nascimento: string;
  cpf: string;
  endereco_completo: string;
  email: string;
  whatsapp: string;
  tipo_inscricao: TipoInscricao | "";
};

type Props = {
  submitLabel?: string;
  redirectTo?: string;
  onSuccess?: () => void;
};

export default function InscricaoForm({
  submitLabel = "Finalizar inscrição",
  redirectTo,
  onSuccess,
}: Props) {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    data_nascimento: "",
    cpf: "",
    endereco_completo: "",
    email: "",
    whatsapp: "",
    tipo_inscricao: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCardSelect = (tipo: TipoInscricao) => {
    setFormData({ ...formData, tipo_inscricao: tipo });
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

    if (!formData.tipo_inscricao) {
      setError("Selecione o tipo de inscrição.");
      setLoading(false);
      return;
    }

    const valor_inscricao = getValorInscricao(formData.tipo_inscricao);

    const response = await fetch("/api/mercadopago/create-preference", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: formData.nome,
        data_nascimento: formData.data_nascimento,
        cpf: cpfClean,
        endereco_completo: formData.endereco_completo,
        email: formData.email,
        whatsapp: formData.whatsapp,
        tipo_inscricao: formData.tipo_inscricao,
        valor_inscricao,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Erro ao criar preferência de pagamento.");
      setLoading(false);
      return;
    }

    if (!data.init_point) {
      setError("Não foi possível iniciar o pagamento.");
      setLoading(false);
      return;
    }

    if (onSuccess) onSuccess();
    window.location.href = data.init_point;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4 rounded-[32px] border border-white/10 bg-white/5 p-4">
        <p className="text-sm uppercase tracking-[0.35em] text-lime-400">
          Escolha sua inscrição
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {pagamentoOptions.map((option) => {
            const selected = formData.tipo_inscricao === option.tipo;
            return (
              <button
                key={option.tipo}
                type="button"
                onClick={() => handleCardSelect(option.tipo)}
                className={`rounded-[2rem] border p-5 text-left transition focus:outline-none ${
                  selected
                    ? "border-lime-400 bg-lime-400/10 shadow-[0_0_20px_rgba(132,204,22,0.15)]"
                    : "border-white/10 bg-black/70 hover:border-lime-400/50"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-lg font-black text-white">{option.titulo}</p>
                    <p className="mt-2 text-sm text-zinc-400">{option.descricao}</p>
                  </div>
                  <span className="rounded-full bg-white/5 px-4 py-2 text-sm font-bold text-white">
                    R$ {option.preco.toFixed(2).replace(".", ",")}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <p className="text-sm text-zinc-400">
          Após o desafio, o frete do kit será cobrado separadamente conforme o
          endereço de envio.
        </p>
      </div>
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