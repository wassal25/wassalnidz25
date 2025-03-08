
import { createClient } from '@supabase/supabase-js';

// Création du client Supabase avec les clés d'API
const supabaseUrl = 'https://eapailcwzemhojmrnyuy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhcGFpbGN3emVtaG9qbXJueXV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzNDk4MjYsImV4cCI6MjA1NjkyNTgyNn0.SOhQjNqbN8TzFGPUJAF0MgVSQpHvJjDqc3m53tiRfBc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
