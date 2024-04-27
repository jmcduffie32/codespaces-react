import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabaseUrl = 'https://taosfdmlsyoxrprdjucb.supabase.co'
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhb3NmZG1sc3lveHJwcmRqdWNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM1NzIzMjcsImV4cCI6MjAyOTE0ODMyN30.8HQ07JF0T_pbxZRrd2sP8QoY67DQuKPYAUzdxNG0mP8"
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
