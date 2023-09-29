import { createClient } from "@supabase/supabase-js"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const supabase = createClient('https://fyvhhrgqiyefkzkijifz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5dmhocmdxaXllZmt6a2lqaWZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU4ODk0MDYsImV4cCI6MjAxMTQ2NTQwNn0.2_gte6HPIXEtS2wj-Rg0t_-VmQqnDmjWBp0IREROzzg')