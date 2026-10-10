import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tludxvgefzyqpmzkzoou.supabase.co';
const supabaseKey = 'sb_publishable_uxK6jbYZHQpg-v3HzExDZA_naF4fekE';

export const supabase = createClient(supabaseUrl, supabaseKey);
