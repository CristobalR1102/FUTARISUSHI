import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://gnenxuwzljdguzftflov.supabase.co"
const supabaseKey = "sb_publishable_6g05aHAzE8FAQfBpM_BRfw_AcMNlgUd"

export const supabase = createClient(supabaseUrl, supabaseKey)