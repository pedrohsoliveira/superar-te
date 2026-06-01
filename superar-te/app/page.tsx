const whatsappLink = "https://wa.me/5584998637619?text=Ol%C3%A1!%20Quero%20participar%20do%20SUPERAR-TE%20%7C%20100KM%20em%2060%20dias.%20Gostaria%20de%20receber%20mais%20informa%C3%A7%C3%B5es.";

export default function Home() {
  const steps = [
    'Inscreva-se',
    'Entre na tribo',
    'Registre suas atividades',
    'Acompanhe sua evolução',
    'Conquiste sua medalha',
  ];

  const kitItems = [
    'Camisa oficial',
    'Medalha exclusiva',
    'Certificado digital',
    'Dashboard de evolução',
    'Comunidade exclusiva',
    'Conteúdos e desafios semanais',
  ];

  const tribeValues = [
    { title: 'Apoio', description: 'Uma comunidade presente em cada passo.' },
    { title: 'Respeito', description: 'Espaço seguro para todos os ritmos.' },
    { title: 'Disciplina', description: 'Rotina construída com foco e cuidado.' },
    { title: 'Constância', description: 'Pequenas vitórias a cada dia.' },
    { title: 'Evolução', description: 'Comparar com sua versão de ontem.' },
    { title: 'Propósito', description: 'Uma missão maior que você.' },
  ];

  const faqs = [
    { question: 'Posso caminhar?', answer: 'Sim. O desafio é para caminhantes, iniciantes e corredores, com foco na superação pessoal.' },
    { question: 'Preciso ser corredor?', answer: 'Não. O projeto foi criado para qualquer pessoa acima de 16 anos que queira sair do sedentarismo.' },
    { question: 'Como envio minhas atividades?', answer: 'Você registra suas atividades na plataforma ou pelo grupo da tribo e mantém a evolução visível.' },
    { question: 'O desafio é presencial?', answer: 'Não, é 100% remoto, com suporte digital e uma comunidade de apoio.' },
    { question: 'Recebo medalha?', answer: 'Sim. Ao completar os 100km em 60 dias você ganha medalha exclusiva.' },
    { question: 'Qual o prazo para completar?', answer: 'Você tem 60 dias para concluir o desafio e atingir a meta de 100km.' },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#020202]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 text-sm text-zinc-300 md:text-base">
          <a href="#hero" className="font-semibold tracking-[0.3em] uppercase text-white">
            SUPERAR-TE
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            <a href="#desafio" className="transition hover:text-lime-400">O Desafio</a>
            <a href="#como-funciona" className="transition hover:text-lime-400">Como Funciona</a>
            <a href="#kit-atleta" className="transition hover:text-lime-400">Kit Atleta</a>
            <a href="#tribo" className="transition hover:text-lime-400">Tribo</a>
            <a href="#faq" className="transition hover:text-lime-400">FAQ</a>
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

      <section id="hero" className="relative overflow-hidden bg-black pt-24 pb-20 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/70 to-black/90"></div>

        <div className="relative mx-auto flex max-w-7xl flex-col gap-14 px-6">
          <div className="flex flex-col gap-6 rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/40 backdrop-blur-sm md:p-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.35em] text-lime-400">Ninguém fica para trás</p>
                <h1 className="text-5xl font-black uppercase leading-tight text-white sm:text-6xl md:text-7xl">
                  100KM
                </h1>
                <p className="max-w-3xl text-2xl font-semibold uppercase tracking-[0.12em] text-zinc-100 sm:text-3xl">
                  PARA RECONSTRUIR SUA MENTE E SEU CORPO.
                </p>
              </div>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center rounded-full bg-lime-400 px-8 py-4 text-base font-bold text-black transition hover:bg-lime-300 sm:w-auto sm:px-10 sm:text-lg"
              >
                WhatsApp
              </a>
            </div>

            <div className="grid gap-6 rounded-3xl border border-white/10 bg-black/30 p-6 text-center md:grid-cols-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-3xl font-black text-white">100KM</p>
                <p className="mt-2 text-sm uppercase text-zinc-400">distância</p>
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
                <p className="mt-2 text-sm uppercase text-zinc-400">propósito</p>
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

      <section id="desafio" className="relative border-t border-white/10 bg-[#080808] py-20 px-6 text-zinc-100">
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-10 shadow-xl shadow-black/20 backdrop-blur-sm">
            <h2 className="text-4xl font-black text-white">Ninguém fica para trás</h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
              O SUPERAR-TE nasceu para pessoas reais. Cansadas, sobrecarregadas, sedentárias ou simplesmente buscando um recomeço. Aqui o objetivo não é ser o melhor. É não desistir de si mesmo.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-5">
            {steps.map((item) => (
              <div key={item} className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-lg shadow-black/10">
                <p className="text-lg font-semibold uppercase tracking-[0.18em] text-lime-400">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="kit-atleta" className="border-t border-white/10 bg-black py-20 px-6 text-zinc-100">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-lime-400">O que o atleta recebe</p>
            <h2 className="mt-4 text-4xl font-black text-white">Kit SUPERAR-TE</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {kitItems.map((item) => (
              <div key={item} className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:bg-white/10">
                <p className="text-xl font-semibold text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="tribo" className="border-t border-white/10 bg-[#080808] py-20 px-6 text-zinc-100">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-lime-400">Tribo SUPERAR-TE</p>
            <h2 className="mt-4 text-4xl font-black text-white">Pertencimento que transforma</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {tribeValues.map((item) => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg shadow-black/10">
                <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-zinc-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="border-t border-white/10 bg-black py-20 px-6 text-zinc-100">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-lime-400">Perguntas frequentes</p>
            <h2 className="mt-4 text-4xl font-black text-white">FAQ</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {faqs.map((item) => (
              <div key={item.question} className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/10">
                <h3 className="text-xl font-semibold text-white">{item.question}</h3>
                <p className="mt-3 text-zinc-300">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#070707] py-24 px-6 text-center text-white">
        <div className="mx-auto max-w-4xl rounded-[32px] border border-white/10 bg-white/5 p-12 shadow-2xl shadow-black/30 backdrop-blur-sm">
          <h2 className="text-4xl font-black sm:text-5xl">Seu maior adversário é desistir.</h2>
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
    </main>
  );
}
