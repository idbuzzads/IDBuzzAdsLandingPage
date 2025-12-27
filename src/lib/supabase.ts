import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Panel = {
  id: string;
  name: string;
  size: 'small' | 'medium' | 'large';
  position: string;
  dimensions: { width: number; height: number };
  monthly_cost: number;
  status: 'available' | 'reserved' | 'active';
  reserved_by: string | null;
  created_at: string;
  updated_at: string;
};

export type Reservation = {
  id: string;
  panel_id: string | null;
  advertiser_id: string | null;
  business_name: string;
  contact_name: string;
  email: string;
  phone: string | null;
  panel_size_requested: 'small' | 'medium' | 'large';
  artwork_url: string | null;
  notes: string | null;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
};

export type RoutePoint = {
  id: string;
  timestamp: string;
  latitude: number;
  longitude: number;
  speed: number;
  estimated_impressions: number;
  is_simulated: boolean;
  created_at: string;
};

export type TransparencyMetrics = {
  id: string;
  month: string;
  vehicle_cost: number;
  monthly_payment: number;
  panels_funded_count: number;
  total_revenue: number;
  operating_costs: Record<string, number>;
  created_at: string;
  updated_at: string;
};
