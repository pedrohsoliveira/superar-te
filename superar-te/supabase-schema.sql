-- Supabase schema for member registrations, activities, and uploads
-- Execute these statements in your Supabase project's SQL editor.

-- Enable pgcrypto for UUID generation if not already enabled.
create extension if not exists pgcrypto;

-- Table for member registrations
create table if not exists inscricoes (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  data_nascimento date not null,
  cpf text not null,
  endereco_completo text not null,
  email text not null,
  whatsapp text not null,
  user_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create unique index if not exists inscricoes_email_idx on inscricoes (email);
create unique index if not exists inscricoes_cpf_idx on inscricoes (cpf);

alter table if exists inscricoes add column if not exists tipo_inscricao text;
alter table if exists inscricoes add column if not exists valor_inscricao numeric(10,2);
alter table if exists inscricoes add column if not exists frete_cobrado boolean default false;
alter table if exists inscricoes add column if not exists status text default 'PENDENTE';
alter table if exists inscricoes add column if not exists mercadopago_status text;
alter table if exists inscricoes add column if not exists mercadopago_payment_id text;

-- Table for activity logs
create table if not exists atividades (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  date date not null,
  distance numeric(8,2) not null,
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists atividades_user_date_idx on atividades (user_id, date desc);

-- Table for upload metadata
create table if not exists uploads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  path text not null,
  file_name text not null,
  content_type text,
  created_at timestamptz not null default now()
);

create index if not exists uploads_user_created_idx on uploads (user_id, created_at desc);

-- Enable Row Level Security immediately after table creation
alter table if exists inscricoes enable row level security;
alter table if exists atividades enable row level security;
alter table if exists uploads enable row level security;
