import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pswxiydpnpypjlhqkeir.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzd3hpeWRwbnB5cGpsaHFrZWlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4MTYxMjYsImV4cCI6MjA2NDM5MjEyNn0.as4QmWUVgV4Npx3W4wdHIGRNuCIzztY6DijxUvG6kyM'

export const supabase = createClient(supabaseUrl, supabaseKey)
