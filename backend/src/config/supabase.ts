import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL!;
const supabasePublishableKey = process.env.SUPABASE_PUBLISHABLE_DEFAULT_KEY!;

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

export type Note = {
  id: string;
  title: string;
  body: string;
  created_at: string;
  audio_url: string;
  duration?: number;
  status?: "uploading" | "processing" | "ready" | "error";
  updated_at: string;
};
