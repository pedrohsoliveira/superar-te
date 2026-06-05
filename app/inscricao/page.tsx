"use client";

import { useState } from "react";

const modalidades = ["Corrida", "Caminhada", "Ciclismo", "HIIT", "Funcional"];
const tamanhos = ["PP", "P", "M", "G", "GG"];

export default function Inscricao() {
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    whatsapp: "",
    email: "",
    cidade: "",
    modalidade: "",
    tamanhoCamisa: "",
    observacoes: "",
  });
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErro("");
    setSucesso("");

    if (!formData.nomeCompleto.trim()) {
      setErro("O nome completo é obrigatório.");
      return;
    }

    if (!formData.whatsapp.trim()) {
      setErro("O WhatsApp é obrigatório.");
      return;
    }

    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErro("Informe um e-mail válido.");
      return;
    }

    if (!formData.modalidade) {
      setErro("A modalidade é obrigatória.");
      return;
    }

    if (!formData.tamanhoCamisa) {
      setErro("O tamanho da camisa é obrigatório.");
      return;
    }

    setCarregando(true);

    try {
      const response = await fetch("/api/inscricoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome_completo: formData.nomeCompleto,
          whatsapp: formData.whatsapp,
          email: formData.email,
          cidade: formData.cidade,
          modalidade: formData.modalidade,
          tamanho_camisa: formData.tamanhoCamisa,
          observacoes: formData.observacoes,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setErro(result.error || "Erro ao enviar inscrição. Tente novamente.");
        return;
      }

      setSucesso("Inscrição enviada com sucesso! Em breve entraremos em contato.");
      setFormData({
        nomeCompleto: "",
        whatsapp: "",
        email: "",
        cidade: "",
        modalidade: "",
        tamanhoCamisa: "",
        observacoes: "",
      });
    } catch (error) {
      setErro("Falha ao enviar inscrição. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="/" className="text-base font-black tracking-[0.3em] sm:text-xl">
            SUPERAR-TE
          </a>
        </div>
      </header>

      <section className="flex min-h-screen items-center px-4 pt-28 sm:px-6">
        <div className="w-full max-w-3xl mx-auto">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md sm:p-10 lg:p-14">
            <div className="mb-8">
              <h1 className="text-4xl font-black">Inscrição</h1>
              <p className="mt-2 text-white/70">
                Complete os dados abaixo para garantir sua vaga no desafio.
              </p>
            </div>

            {erro && (
              <div className="mb-6 rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-red-400">
                {erro}
              </div>
            )}

            {sucesso && (
              <div className="mb-6 rounded-lg border border-lime-400/50 bg-lime-400/10 p-4 text-lime-300">
                {sucesso}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-bold text-white/80">
                  Nome Completo
                  <input
                    type="text"
                    name="nomeCompleto"
                    value={formData.nomeCompleto}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:border-lime-400 focus:outline-none focus:ring-1 focus:ring-lime-400"
                    placeholder="Seu nome completo"
                  />
                </label>

                <label className="space-y-2 text-sm font-bold text-white/80">
                  WhatsApp
                  <input
                    type="text"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:border-lime-400 focus:outline-none focus:ring-1 focus:ring-lime-400"
                    placeholder="(00) 00000-0000"
                  />
                </label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-bold text-white/80">
                  E-mail
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:border-lime-400 focus:outline-none focus:ring-1 focus:ring-lime-400"
                    placeholder="seu@email.com"
                  />
                </label>

                <label className="space-y-2 text-sm font-bold text-white/80">
                  Cidade
                  <input
                    type="text"
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:border-lime-400 focus:outline-none focus:ring-1 focus:ring-lime-400"
                    placeholder="Cidade"
                  />
                </label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-bold text-white/80">
                  Modalidade
                  <select
                    name="modalidade"
                    value={formData.modalidade}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-lime-400 focus:outline-none focus:ring-1 focus:ring-lime-400"
                  >
                    <option value="">Selecione</option>
                    {modalidades.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-2 text-sm font-bold text-white/80">
                  Tamanho da Camisa
                  <select
                    name="tamanhoCamisa"
                    value={formData.tamanhoCamisa}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-lime-400 focus:outline-none focus:ring-1 focus:ring-lime-400"
                  >
                    <option value="">Selecione</option>
                    {tamanhos.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="space-y-2 text-sm font-bold text-white/80">
                Observações
                <textarea
                  name="observacoes"
                  value={formData.observacoes}
                  onChange={handleChange}
                  rows={5}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:border-lime-400 focus:outline-none focus:ring-1 focus:ring-lime-400"
                  placeholder="Diga algo mais sobre você"
                />
              </label>

              <button
                type="submit"
                disabled={carregando}
                className="w-full rounded-full bg-lime-400 px-8 py-4 text-lg font-black text-black transition hover:bg-lime-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {carregando ? "Enviando inscrição..." : "Enviar Inscrição"}
              </button>

              <div className="text-center">
                <a href="/" className="text-sm text-white/60 hover:text-white/80">
                  Voltar para a página principal
                </a>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
