"use client";

import React from "react";
import Image from "next/image";

const whatsappLink =
  "https://wa.me/5584998637619?text=Ol%C3%A1!%20Quero%20participar%20do%20SUPERAR-TE%20%7C%20100KM%20em%2060%20dias.%20Gostaria%20de%20receber%20mais%20informa%C3%A7%C3%B5es.";

export default function Home() {
  const [tempoRestante, setTempoRestante] = React.useState({
    dias: 30,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  React.useEffect(() => {
    const dataFinal = new Date();
    dataFinal.setDate(dataFinal.getDate() + 30);

    const intervalo = setInterval(() => {
      const agora = new Date().getTime();
      const diferenca = dataFinal.getTime() - agora;

      if (diferenca <= 0) {
        clearInterval(intervalo);
        setTempoRestante({
          dias: 0,
          horas: 0,
          minutos: 0,
          segundos: 0,
        });
        return;
      }

      const d = Math.floor(diferenca / (1000 * 60 * 60 * 24));
      const h = Math.floor(
        (diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const m = Math.floor(
        (diferenca % (1000 * 60 * 60)) / (1000 * 60)
      );
      const s = Math.floor((diferenca % (1000 * 60)) / 1000);

      setTempoRestante({
        dias: d,
        horas: h,
        minutos: m,
        segundos: s,
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  const formatarNumero = (num: number) => String(num).padStart(2, "0");

  const steps = [
    "Inscreva-se",
    "Entre na tribo",
    "Registre suas atividades",
    "Acompanhe sua evolução",
    "Conquiste sua medalha",
  ];

  const tribeValues = [
    { title: "Apoio", description: "Uma comunidade presente em cada passo." },
    { title: "Respeito", description: "Espaço seguro para todos os ritmos." },
    { title: "Disciplina", description: "Rotina construída com foco e cuidado." },
    { title: "Constância", description: "Pequenas vitórias a cada dia." },
    { title: "Evolução", description: "Comparar com sua versão de ontem." },
    { title: "Propósito", description: "Uma missão maior que você." },
  ];

  const faqs = [
    {
      question: "Posso caminhar?",
      answer:
        "Sim. O desafio é para caminhantes, iniciantes e corredores, com foco na superação pessoal.",
    },
    {
      question: "Preciso ser corredor?",
      answer:
        "Não. O projeto foi criado para qualquer pessoa acima de 16 anos que queira sair do sedentarismo.",
    },
    {
      question: "Como envio minhas atividades?",
      answer:
        "Você registra suas atividades na plataforma ou pelo grupo da tribo e mantém a evolução visível.",
    },
    {
      question: "O desafio é presencial?",
      answer:
        "Não, é 100% remoto, com suporte digital e uma comunidade de apoio.",
    },
    {
      question: "Recebo medalha?",
      answer:
        "Sim. Ao completar os 100km em 60 dias você ganha medalha exclusiva.",
    },
    {
      question: "Qual o prazo para completar?",
      answer:
        "Você tem 60 dias para concluir o desafio e atingir a meta de 100km.",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#020202]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 text-sm text-zinc-300 md:text-base">
          <a href="#hero" className="flex items-center">
            <Image
              src="/logos/J.png"
              alt="Logo Superar-te"
              width={280}
              height={400}
              className="object-contain"
              priority
            />
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            <a href="#desafio" className="transition hover:text-lime-400">
              O Desafio
            </a>
            <a href="#kit-atleta" className="transition hover:text-lime-400">
              Kit Atleta
            </a>
            <a href="#tribo" className="transition hover:text-lime-400">
              Tribo
            </a>
            <a href="#faq" className="transition hover:text-lime-400">
              FAQ
            </a>
          </nav>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full bg-lime-400 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-lime-300"
          >
            Quero Participar
          </a>
        </div>
      </header>

      <section
        id="hero"
        className="relative overflow-hidden bg-black pt-32 pb-20 text-white"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/70 to-black/90" />

        <div className="relative mx-auto flex max-w-7xl flex-col gap-14 px-6">
          <div className="flex flex-col gap-6 rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/40 backdrop-blur-sm md:p-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.35em] text-lime-400">
                  Ninguém fica para trás
                </p>

                <h1 className="text-5xl font-black uppercase leading-tight text-white sm:text-6xl md:text-7xl">
                  100KM
                </h1>

                <p className="max-w-3xl text-2xl font-semibold uppercase tracking-[0.12em] text-zinc-100 sm:text-3xl">
                  PARA RECONSTRUIR SUA MENTE E SEU CORPO.
                </p>
              </div>

              <div className="rounded-3xl border border-lime-400/30 bg-black/60 p-6 text-center">
                <p className="mb-4 text-sm uppercase tracking-[0.3em] text-lime-400">
                  Inscrições iniciam em
                </p>

                <div className="grid grid-cols-4 gap-3">
                  <div>
                    <p className="text-3xl font-black">
                      {formatarNumero(tempoRestante.dias)}
                    </p>
                    <span className="text-xs uppercase text-zinc-400">dias</span>
                  </div>

                  <div>
                    <p className="text-3xl font-black">
                      {formatarNumero(tempoRestante.horas)}
                    </p>
                    <span className="text-xs uppercase text-zinc-400">horas</span>
                  </div>

                  <div>
                    <p className="text-3xl font-black">
                      {formatarNumero(tempoRestante.minutos)}
                    </p>
                    <span className="text-xs uppercase text-zinc-400">min</span>
                  </div>

                  <div>
                    <p className="text-3xl font-black">
                      {formatarNumero(tempoRestante.segundos)}
                    </p>
                    <span className="text-xs uppercase text-zinc-400">seg</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-6 rounded-3xl border border-white/10 bg-black/30 p-6 text-center md:grid-cols-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-3xl font-black text-white">100KM</p>
                <p className="mt-2 text-sm uppercase text-zinc-400">
                  distância
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-3xl font-black text-white">60 DIAS</p>
                <p className="mt-2 text-sm uppercase text-zinc-400">tempo</p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-3xl font-black text-white">100%</p>
                <p className="mt-2 text-sm uppercase text-zinc-400">remoto</p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-3xl font-black text-white">1</p>
                <p className="mt-2 text-sm uppercase text-zinc-400">
                  propósito
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/25 backdrop-blur-sm md:p-12">
            <p className="max-w-3xl text-lg leading-8 text-zinc-200">
              Caminhe. Corra. Supere.
            </p>
            <p className="mt-4 max-w-3xl text-xl font-semibold leading-9 text-white">
              60 dias para provar para si mesmo do que você é capaz.
            </p>
          </div>
        </div>
      </section>

      <section
        id="desafio"
        className="relative border-t border-white/10 bg-[#080808] py-20 px-6 text-zinc-100"
      >
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-10 shadow-xl shadow-black/20 backdrop-blur-sm">
            <h2 className="text-4xl font-black text-white">
              Ninguém fica para trás
            </h2>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
              O SUPERAR-TE nasceu para pessoas reais. Cansadas,
              sobrecarregadas, sedentárias ou simplesmente buscando um
              recomeço. Aqui o objetivo não é ser o melhor. É não desistir de si
              mesmo.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-5">
            {steps.map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-lg shadow-black/10"
              >
                <p className="text-lg font-semibold uppercase tracking-[0.18em] text-lime-400">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="kit-atleta"
        className="border-t border-white/10 bg-black py-20 px-6 text-zinc-100"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-lime-400">
              O que o atleta recebe
            </p>

            <h2 className="mt-4 text-4xl font-black text-white sm:text-5xl">
              Kit SUPERAR-TE
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
              Um kit pensado para marcar sua jornada de superação do início ao
              fim.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { title: "Camisa Oficial", image: "/images/CAMISA.png" },
              { title: "Medalha Exclusiva", image: "/images/MEDALHA.png" },
              { title: "Certificado Digital", image: "/images/CERTIFICADO.png" },
              { title: "Sacochila Oficial", image: "/images/SACOCHILA.png" },
            ].map((item) => (
              <div
                key={item.title}
                className="group rounded-[32px] border border-white/10 bg-white/5 p-6 text-center shadow-2xl shadow-black/30 transition duration-300 hover:-translate-y-2 hover:border-lime-400/40 hover:bg-white/10"
              >
                <div className="flex h-64 items-center justify-center rounded-3xl border border-white/10 bg-black/40 p-4">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={500}
                    height={500}
                    className="max-h-full max-w-full object-contain transition duration-300 group-hover:scale-105"
                  />
                </div>

                <h3 className="mt-6 text-2xl font-black text-white">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              "Dashboard de evolução",
              "Comunidade exclusiva",
              "Conteúdos e desafios semanais",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-lime-400/20 bg-lime-400/10 p-5 text-center"
              >
                <span className="font-bold text-lime-400">✓ {item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="tribo"
        className="border-t border-white/10 bg-[#080808] py-20 px-6 text-zinc-100"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-lime-400">
              Tribo SUPERAR-TE
            </p>

            <h2 className="mt-4 text-4xl font-black text-white">
              Pertencimento que transforma
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {tribeValues.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg shadow-black/10"
              >
                <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-zinc-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="faq"
        className="border-t border-white/10 bg-black py-20 px-6 text-zinc-100"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-lime-400">
              Perguntas frequentes
            </p>

            <h2 className="mt-4 text-4xl font-black text-white">FAQ</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {faqs.map((item) => (
              <div
                key={item.question}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/10"
              >
                <h3 className="text-xl font-semibold text-white">
                  {item.question}
                </h3>

                <p className="mt-3 text-zinc-300">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#070707] py-24 px-6 text-center text-white">
        <div className="mx-auto max-w-4xl rounded-[32px] border border-white/10 bg-white/5 p-12 shadow-2xl shadow-black/30 backdrop-blur-sm">
          <h2 className="text-4xl font-black sm:text-5xl">
            Seu maior adversário é desistir.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-zinc-300">
            60 dias. 100km. Uma nova versão de você.
          </p>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-flex items-center justify-center rounded-full bg-lime-400 px-8 py-4 text-lg font-bold text-black transition hover:bg-lime-300"
          >
            Quero entrar para o SUPERAR-TE
          </a>
        </div>
      </section>

      {/* BOTÕES FLUTUANTES */}
<div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-4">
  {/* INSTAGRAM */}
  <a
    href="https://www.instagram.com/superarte.oficial"
    target="_blank"
    rel="noreferrer"
    aria-label="Instagram SUPERAR-TE"
    className="group flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] shadow-2xl shadow-pink-500/40 transition hover:scale-110"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="h-8 w-8 fill-white"
    >
      <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.65 0 3 1.35 3 3v10c0 1.65-1.35 3-3 3H7c-1.65 0-3-1.35-3-3V7c0-1.65 1.35-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm5.25-2.25a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z" />
    </svg>
  </a>

  {/* WHATSAPP */}
  <a
    href={whatsappLink}
    target="_blank"
    rel="noreferrer"
    aria-label="Falar no WhatsApp"
    className="flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-[#25D366] shadow-2xl shadow-green-500/40 transition hover:scale-110"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className="h-8 w-8 fill-white"
    >
      <path d="M16.04 3C8.84 3 3 8.74 3 15.82c0 2.51.74 4.96 2.14 7.06L3 29l6.33-2.08a13.2 13.2 0 006.71 1.82C23.24 28.74 29 23 29 15.92 29 8.84 23.24 3 16.04 3zm7.69 18.42c-.32.89-1.84 1.7-2.53 1.81-.65.11-1.47.16-2.37-.12-.55-.17-1.25-.41-2.15-.79-3.78-1.64-6.23-5.47-6.42-5.72-.19-.25-1.53-2.04-1.53-3.9 0-1.86.98-2.77 1.33-3.15.35-.38.76-.47 1.02-.47.25 0 .51 0 .73.01.24.01.56-.09.87.66.32.77 1.08 2.65 1.18 2.84.1.19.16.41.03.66-.13.25-.19.41-.38.63-.19.22-.4.49-.57.66-.19.19-.39.39-.17.77.22.38.98 1.62 2.11 2.62 1.45 1.29 2.67 1.69 3.05 1.88.38.19.6.16.82-.09.22-.25.95-1.1 1.2-1.47.25-.38.51-.32.86-.19.35.13 2.23 1.05 2.61 1.24.38.19.63.28.73.44.09.16.09.95-.22 1.84z" />
    </svg>
  </a>
</div>
    </main>
  );
}