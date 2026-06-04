-- Supabase admin policies for the inscricoes table
-- Execute this once in the Supabase SQL editor.

alter table if exists inscricoes enable row level security;

drop policy if exists "Admin select inscricoes" on inscricoes;
drop policy if exists "Admin update inscricoes" on inscricoes;

create policy "Admin select inscricoes"
  on inscricoes
  for select
  using (
    auth.role() = 'authenticated'
    and auth.jwt() ->> 'email' in ('admin@example.com')
  );

create policy "Admin update inscricoes"
  on inscricoes
  for update
  using (
    auth.role() = 'authenticated'
    and auth.jwt() ->> 'email' in ('admin@example.com')
  )
  with check (
    auth.role() = 'authenticated'
    and auth.jwt() ->> 'email' in ('admin@example.com')
  );
