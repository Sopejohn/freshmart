import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

const supabaseUrl = `https://${projectId}.supabase.co`;
const supabaseAnonKey = publicAnonKey;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// API base URL
export const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-a8a8d287`;
