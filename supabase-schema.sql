-- Cria extensão para UUID no Supabase
create extension if not exists "pgcrypto";

-- Cria tabela de inscrições
create table if not exists inscricoes (
  id uuid primary key default gen_random_uuid(),
  nome_completo text not null,
  whatsapp text not null,
  email text not null,
  cidade text,
  modalidade text not null,
  tamanho_camisa text not null,
  observacoes text,
  created_at timestamptz not null default now()
);
