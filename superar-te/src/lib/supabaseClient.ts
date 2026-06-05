import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let supabaseInstance: SupabaseClient | null = null;
let supabaseServerInstance: SupabaseClient | null = null;

export function getSupabase(server = false) {
  if (server) {
    if (supabaseServerInstance) return supabaseServerInstance;

    if (supabaseUrl && supabaseServiceRoleKey && supabaseUrl.startsWith('http')) {
      supabaseServerInstance = createClient(supabaseUrl, supabaseServiceRoleKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      });
      return supabaseServerInstance;
    }

    return null;
  }

  if (supabaseInstance) return supabaseInstance;

  if (supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http')) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
    return supabaseInstance;
  }

  return null;
}
