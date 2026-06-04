-- Supabase RLS policies for private member data
-- Execute these statements in your Supabase project's SQL editor.

-- Enable RLS on the tables
alter table if exists inscricoes enable row level security;
alter table if exists atividades enable row level security;
alter table if exists uploads enable row level security;

-- Policy for inscricoes: only allow users to read and manage their own record
create policy "Select own inscricoes"
  on inscricoes
  for select
  using (auth.uid() = user_id);

create policy "Insert own inscricoes"
  on inscricoes
  for insert
  with check (auth.uid() = user_id);

create policy "Update own inscricoes"
  on inscricoes
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Delete own inscricoes"
  on inscricoes
  for delete
  using (auth.uid() = user_id);

-- Policy for atividades: only allow users to read and manage their own activities
create policy "Select own atividades"
  on atividades
  for select
  using (auth.uid() = user_id);

create policy "Insert own atividades"
  on atividades
  for insert
  with check (auth.uid() = user_id);

create policy "Update own atividades"
  on atividades
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Delete own atividades"
  on atividades
  for delete
  using (auth.uid() = user_id);

-- Policy for uploads metadata: only allow users to read and manage their own uploads
create policy "Select own uploads"
  on uploads
  for select
  using (auth.uid() = user_id);

create policy "Insert own uploads"
  on uploads
  for insert
  with check (auth.uid() = user_id);

create policy "Update own uploads"
  on uploads
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Delete own uploads"
  on uploads
  for delete
  using (auth.uid() = user_id);

-- Optional: allow authenticated users to access their own data for storage operations
-- Make sure the storage bucket permissions are configured for signed URLs and private access.
