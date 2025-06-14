import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL ve Anon Key tanımlanmalıdır!');
}

// Public client - RLS politikalarına tabi
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client - RLS'i bypass eder (dikkatli kullan!)
export const supabaseAdmin = supabaseServiceRoleKey 
  ? createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null;

// Veritabanı tabloları
export const TABLES = {
  PROJECTS: 'projects',
  CALCULATIONS: 'calculations',
  USERS: 'users',
  CLIMATE_DATA_CACHE: 'climate_data_cache'
};

// Helper fonksiyonlar
export const getSupabaseClient = (useAdmin = false) => {
  if (useAdmin && supabaseAdmin) {
    return supabaseAdmin;
  }
  return supabase;
};