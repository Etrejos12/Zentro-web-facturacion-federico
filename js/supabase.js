import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = 'https://yswjzmafxmhltxnglrzx.supabase.co'
const supabaseKey = 'sb_publishable_rShUVlLECIVbtoFOodgk4A_tqrFzK1j'

export const supabase = createClient(
    supabaseUrl,
    supabaseKey
)