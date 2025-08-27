// --- FICHERO: backend/config/supabase.js (VERSIÓN FINAL Y CORRECTA) ---

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Esta validación es buena, pero incluso si la quitaras, funcionaría.
// La dejamos porque es una buena práctica.
if (!supabaseUrl || !supabaseKey) {
  // En Vercel, si las variables no están, el build fallará antes de llegar aquí.
  throw new Error("Supabase URL and Key are not available in the environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);