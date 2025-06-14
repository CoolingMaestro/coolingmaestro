import { createClient } from '@supabase/supabase-js';

// Supabase URL ve Anon Key - bunlar public olabilir
const supabaseUrl = 'https://fgslwtfknhzkscjrrnrq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnc2x3dGZrbmh6a3NjanJybnJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxNDA0NTcsImV4cCI6MjA2NDcxNjQ1N30.GJDnTu0YKY4cxqcG5P8xwoo9qyxzMJJZf1RwBqJ4W5c';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tablo isimleri
export const TABLES = {
  PROJECTS: 'projects',
  CALCULATIONS: 'calculations',
  USERS: 'users',
  CLIMATE_DATA_CACHE: 'climate_data_cache'
} as const;