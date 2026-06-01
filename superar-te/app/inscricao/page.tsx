"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Inscricao() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    cpf: "",
    endereco: "",
    dataNascimento: "",
    email: "",
    username: "",
    senha: "",
    confirmaSenha: "",
  });

  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const formatarCPF = (valor: string) => {
    return valor
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .substring(0, 14);
  };

  const validarCPF = (cpf: string) => {
    const numeros = cpf.replace(/\D/g, "");
    if (numeros.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(numeros)) return false;
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "cpf") {
      setFormData({ ...formData, [name]: formatarCPF(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      // Validações
      if (
        !formData.nomeCompleto ||
        !formData.cpf ||
        !formData.endereco ||
        !formData.dataNascimento ||
        !formData.email ||
        !formData.username ||
        !formData.senha ||
        !formData.confirmaSenha
      ) {
        setErro("Todos os campos são obrigatórios");
        setCarregando(false);
        return;
      }

      if (!validarCPF(formData.cpf)) {
        setErro("CPF inválido");
        setCarregando(false);
        return;
      }

      if (formData.senha !== formData.confirmaSenha) {
        setErro("As senhas não conferem");
        setCarregando(false);
        return;
      }

      if (formData.senha.length < 6) {
        setErro("A senha deve ter pelo menos 6 caracteres");
        setCarregando(false);
        return;
      }

      if (!formData.email.includes("@")) {
        setErro("E-mail inválido");
        setCarregando(false);
        return;
      }

      // Aqui você faria a chamada para sua API
      // const resposta = await fetch("/api/inscricao", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });

      // Por enquanto, vamos salvar no localStorage para demonstração
      localStorage.setItem("inscricao", JSON.stringify(formData));

      // Redirecionar para página de sucesso
      router.push("/inscricao/sucesso");
    } catch (erro) {
      setErro("Erro ao processar inscrição. Tente novamente.");
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
        <div className="w-full max-w-2xl mx-auto">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md sm:p-10 lg:p-14">
            <div className="mb-8">
              <h1 className="text-4xl font-black">Inscrição</h1>
              <p className="mt-2 text-white/70">
                Preencha seus dados para participar do desafio SUPERAR-TE
              </p>
            </div>

            {erro && (
              <div className="mb-6 rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-red-400">
                {erro}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Nome Completo */}
              <div>
                <label className="block text-sm font-bold text-white/80 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  name="nomeCompleto"
                  value={formData.nomeCompleto}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 backdrop-blur-md focus:border-lime-400 focus:outline-none focus:ring-1 focus:ring-lime-400"
                  placeholder="Seu nome completo"
                />
              </div>

              {/* CPF */}
              <div>
                <label className="block text-sm font-bold text-white/80 mb-2">
                  CPF
                </label>
                <input
                  type="text"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 backdrop-blur-md focus:border-lime-400 focus:outline-none focus:ring-1 focus:ring-lime-400"
                  placeholder="000.000.000-00"
                  maxLength={14}
                />
              </div>

              {/* Endereço */}
              <div>
                <label className="block text-sm font-bold text-white/80 mb-2">
                  Endereço
                </label>
                <input
                  type="text"
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 backdrop-blur-md focus:border-lime-400 focus:outline-none focus:ring-1 focus:ring-lime-400"
                  placeholder="Rua, número, complemento"
                />
              </div>

              {/* Data de Nascimento */}
              <div>
                <label className="block text-sm font-bold text-white/80 mb-2">
                  Data de Nascimento
                </label>
                <input
                  type="date"
                  name="dataNascimento"
                  value={formData.dataNascimento}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 backdrop-blur-md focus:border-lime-400 focus:outline-none focus:ring-1 focus:ring-lime-400"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-white/80 mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 backdrop-blur-md focus:border-lime-400 focus:outline-none focus:ring-1 focus:ring-lime-400"
                  placeholder="seu@email.com"
                />
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-bold text-white/80 mb-2">
                  Usuário (Login)
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 backdrop-blur-md focus:border-lime-400 focus:outline-none focus:ring-1 focus:ring-lime-400"
                  placeholder="Seu nome de usuário"
                />
              </div>

              {/* Senha */}
              <div>
                <label className="block text-sm font-bold text-white/80 mb-2">
                  Senha
                </label>
                <input
                  type="password"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 backdrop-blur-md focus:border-lime-400 focus:outline-none focus:ring-1 focus:ring-lime-400"
                  placeholder="Mínimo 6 caracteres"
                />
              </div>

              {/* Confirmar Senha */}
              <div>
                <label className="block text-sm font-bold text-white/80 mb-2">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  name="confirmaSenha"
                  value={formData.confirmaSenha}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 backdrop-blur-md focus:border-lime-400 focus:outline-none focus:ring-1 focus:ring-lime-400"
                  placeholder="Confirme sua senha"
                />
              </div>

              {/* Botão Enviar */}
              <button
                type="submit"
                disabled={carregando}
                className="w-full rounded-full bg-lime-400 px-8 py-4 text-lg font-black text-black transition hover:bg-lime-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {carregando ? "Processando..." : "Completar Inscrição"}
              </button>

              {/* Link voltar */}
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
