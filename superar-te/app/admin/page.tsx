"use client";

import { useEffect, useMemo, useState } from "react";
import { getSupabase } from "@/src/lib/supabaseClient";
import { isAdminEmail } from "@/src/lib/admin";

const STATUS_OPTIONS = ["PENDENTE", "PAGO", "KIT ENVIADO", "CONCLUÍDO", "CANCELADO"];

type Inscricao = {
  id: string;
  nome: string;
  cpf: string;
  whatsapp: string;
  email: string;
  data_nascimento: string | null;
  endereco_completo: string;
  status: string;
  created_at: string | null;
};

function formatDate(value: string | null) {
  if (!value) return "-";
  try {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function buildCsv(inscricoes: Inscricao[]) {
  const header = [
    "Nome",
    "CPF",
    "WhatsApp",
    "E-mail",
    "Data de nascimento",
    "Status",
    "Data de inscrição",
  ];

  const escapeValue = (value: string) => {
    const escaped = value.replace(/"/g, '""');
    return `"${escaped}"`;
  };

  const rows = inscricoes.map((item) => [
    item.nome,
    item.cpf,
    item.whatsapp,
    item.email,
    formatDate(item.data_nascimento),
    item.status,
    formatDate(item.created_at),
  ]);

  return [header, ...rows].map((row) => row.map(escapeValue).join(",")).join("\n");
}

export default function AdminPage() {
  const [inscricoes, setInscricoes] = useState<Inscricao[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [statusUpdating, setStatusUpdating] = useState<Record<string, boolean>>({});
  const [user, setUser] = useState<any>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [checkedAuth, setCheckedAuth] = useState(false);

  const supabase = getSupabase();

  useEffect(() => {
    checkAdminAccess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function checkAdminAccess() {
    if (!supabase) {
      setErrorMessage("Supabase não configurado.");
      setCheckedAuth(true);
      return;
    }

    const { data: userData, error } = await supabase.auth.getUser();
    const currentUser = userData?.user ?? null;
    setUser(currentUser);

    if (error) {
      setErrorMessage(`Erro de autenticação: ${error.message}`);
      setCheckedAuth(true);
      return;
    }

    if (!currentUser?.email) {
      setErrorMessage("Faça login com uma conta autorizada para acessar o painel admin.");
      setCheckedAuth(true);
      return;
    }

    if (!isAdminEmail(currentUser.email)) {
      setErrorMessage("Acesso negado. Sua conta não está autorizada como admin.");
      setCheckedAuth(true);
      return;
    }

    setIsAuthorized(true);
    setCheckedAuth(true);
    fetchInscricoes();
  }

  async function fetchInscricoes() {
    if (!supabase) {
      setErrorMessage("Supabase não configurado.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    const { data, error } = await supabase
      .from("inscricoes")
      .select("id, nome, cpf, whatsapp, email, data_nascimento, endereco_completo, status, created_at")
      .order("created_at", { ascending: false });

    setLoading(false);

    if (error) {
      setErrorMessage(`Erro ao carregar inscrições: ${error.message}`);
      return;
    }

    setInscricoes(data ?? []);
  }

  async function handleStatusChange(id: string, newStatus: string) {
    if (!supabase) {
      setErrorMessage("Supabase não configurado.");
      return;
    }

    setStatusUpdating((current) => ({ ...current, [id]: true }));
    setErrorMessage("");

    const { error } = await supabase
      .from("inscricoes")
      .update({ status: newStatus })
      .eq("id", id);

    setStatusUpdating((current) => ({ ...current, [id]: false }));

    if (error) {
      setErrorMessage(`Erro ao atualizar status: ${error.message}`);
      return;
    }

    setInscricoes((current) =>
      current.map((item) => (item.id === id ? { ...item, status: newStatus } : item)),
    );
  }

  function downloadCsv() {
    const csv = buildCsv(inscricoes);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `superar-te-inscricoes-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  const filteredInscricoes = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return inscricoes;

    return inscricoes.filter((item) => {
      return (
        item.nome.toLowerCase().includes(query) ||
        item.cpf.toLowerCase().includes(query) ||
        item.whatsapp.toLowerCase().includes(query)
      );
    });
  }, [inscricoes, search]);

  const stats = useMemo(() => {
    const total = inscricoes.length;
    const pendentes = inscricoes.filter((item) => item.status === "PENDENTE").length;
    const pagos = inscricoes.filter((item) => item.status === "PAGO").length;
    const concluidos = inscricoes.filter((item) => item.status === "CONCLUÍDO").length;
    return { total, pendentes, pagos, concluidos };
  }, [inscricoes]);

  if (!checkedAuth) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="rounded-3xl border border-white/10 bg-white/5 px-8 py-6 text-center text-white/80">Carregando painel admin...</div>
      </main>
    );
  }

  if (!isAuthorized) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="max-w-xl rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center">
          <p className="text-lg font-semibold text-white">Acesso administrador</p>
          <p className="mt-4 text-white/70">{errorMessage || "Você não tem permissão para acessar esta página."}</p>
          <a href="/membros/login" className="mt-8 inline-flex rounded-full bg-lime-500 px-6 py-3 text-sm font-bold text-black transition hover:bg-lime-400">
            Fazer login
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#0c0c0c] via-[#0a0a0a] to-[#111111] p-8 shadow-[0_0_80px_rgba(0,255,128,0.05)]">
          <p className="text-sm uppercase tracking-[0.35em] text-lime-400/80">Admin SUPERAR-TE</p>
          <h1 className="mt-3 text-4xl font-black text-white">Painel de inscrições</h1>
          <p className="mt-3 max-w-2xl text-white/70">Visualize, pesquise e atualize o status dos inscritos do desafio com um visual premium e responsivo.</p>
        </header>

        <div className="grid gap-4 lg:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-[0_0_40px_rgba(0,255,128,0.18)]">
            <p className="text-sm uppercase tracking-[0.3em] text-lime-400/80">Total inscritos</p>
            <p className="mt-4 text-4xl font-black text-white">{stats.total}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-[0_0_40px_rgba(0,255,128,0.18)]">
            <p className="text-sm uppercase tracking-[0.3em] text-lime-400/80">Pendentes</p>
            <p className="mt-4 text-4xl font-black text-white">{stats.pendentes}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-[0_0_40px_rgba(0,255,128,0.18)]">
            <p className="text-sm uppercase tracking-[0.3em] text-lime-400/80">Pagos</p>
            <p className="mt-4 text-4xl font-black text-white">{stats.pagos}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-[0_0_40px_rgba(0,255,128,0.18)]">
            <p className="text-sm uppercase tracking-[0.3em] text-lime-400/80">Concluídos</p>
            <p className="mt-4 text-4xl font-black text-white">{stats.concluidos}</p>
          </div>
        </div>

        <section className="mt-10 rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-[0_0_60px_rgba(0,255,128,0.08)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-white/80">Buscar inscritos</label>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Nome, CPF ou WhatsApp"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-white outline-none transition duration-150 focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
              />
            </div>
            <button
              type="button"
              onClick={downloadCsv}
              className="whitespace-nowrap rounded-2xl bg-lime-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-lime-400"
            >
              Exportar CSV
            </button>
          </div>

          <div className="mt-8 overflow-x-auto rounded-[2rem] border border-white/10 bg-[#090909] p-1">
            <table className="min-w-full divide-y divide-white/10 text-sm">
              <thead className="bg-white/5 text-left text-xs uppercase tracking-[0.2em] text-white/60">
                <tr>
                  <th className="px-4 py-3">Nome</th>
                  <th className="px-4 py-3">CPF</th>
                  <th className="px-4 py-3">WhatsApp</th>
                  <th className="px-4 py-3">E-mail</th>
                  <th className="px-4 py-3">Nascimento</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Inscrição</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredInscricoes.map((item) => (
                  <tr key={item.id} className="border-b border-white/10 last:border-b-0">
                    <td className="px-4 py-4 text-white/90">{item.nome}</td>
                    <td className="px-4 py-4 text-white/70">{item.cpf}</td>
                    <td className="px-4 py-4 text-white/70">{item.whatsapp}</td>
                    <td className="px-4 py-4 text-white/70">{item.email}</td>
                    <td className="px-4 py-4 text-white/70">{formatDate(item.data_nascimento)}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <select
                          value={item.status}
                          onChange={(event) => handleStatusChange(item.id, event.target.value)}
                          disabled={statusUpdating[item.id]}
                          className="rounded-2xl border border-white/10 bg-black/70 px-3 py-2 text-sm text-white outline-none transition duration-150 focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
                        >
                          {STATUS_OPTIONS.map((statusOption) => (
                            <option key={statusOption} value={statusOption}>
                              {statusOption}
                            </option>
                          ))}
                        </select>
                        {statusUpdating[item.id] && <span className="text-xs text-lime-300">Salvando...</span>}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-white/70">{formatDate(item.created_at)}</td>
                  </tr>
                ))}
                {filteredInscricoes.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-white/60">
                      {loading ? "Carregando inscrições..." : "Nenhum inscrito encontrado."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {errorMessage ? (
            <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {errorMessage}
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}
