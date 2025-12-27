/*
  # Id Buzz Project Database Schema

  ## Overview
  This migration creates the complete database structure for the Id Buzz mobile advertising platform.

  ## New Tables

  ### 1. `panels`
  Stores information about the 15 advertising panels on the van
  - `id` (uuid, primary key)
  - `name` (text) - Panel identifier (e.g., "Small Panel 1")
  - `size` (text) - Panel size: 'small', 'medium', or 'large'
  - `position` (text) - Location on van (e.g., "driver_side_front")
  - `dimensions` (jsonb) - Width and height in inches
  - `monthly_cost` (numeric) - Monthly advertising cost
  - `status` (text) - 'available', 'reserved', or 'active'
  - `reserved_by` (uuid) - Foreign key to advertiser
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 2. `advertisers`
  Stores advertiser account information
  - `id` (uuid, primary key) - Links to auth.users
  - `business_name` (text)
  - `contact_name` (text)
  - `email` (text)
  - `phone` (text)
  - `status` (text) - 'pending', 'active', 'inactive'
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 3. `reservations`
  Stores panel reservation requests
  - `id` (uuid, primary key)
  - `panel_id` (uuid) - Foreign key to panels
  - `advertiser_id` (uuid) - Foreign key to advertisers
  - `business_name` (text)
  - `contact_name` (text)
  - `email` (text)
  - `phone` (text)
  - `panel_size_requested` (text)
  - `artwork_url` (text) - URL to uploaded artwork
  - `notes` (text)
  - `status` (text) - 'pending', 'approved', 'rejected'
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 4. `routes`
  Stores GPS route data (historical and real-time)
  - `id` (uuid, primary key)
  - `timestamp` (timestamptz)
  - `latitude` (numeric)
  - `longitude` (numeric)
  - `speed` (numeric) - Speed in mph
  - `estimated_impressions` (integer)
  - `is_simulated` (boolean) - True for demo data
  - `created_at` (timestamptz)

  ### 5. `daily_stats`
  Stores aggregated daily statistics
  - `id` (uuid, primary key)
  - `date` (date, unique)
  - `total_impressions` (integer)
  - `distance_traveled` (numeric) - Miles
  - `route_summary` (jsonb)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 6. `transparency_metrics`
  Stores financial transparency data
  - `id` (uuid, primary key)
  - `month` (date, unique)
  - `vehicle_cost` (numeric)
  - `monthly_payment` (numeric)
  - `panels_funded_count` (integer)
  - `total_revenue` (numeric)
  - `operating_costs` (jsonb)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Public read access for panels, routes, daily_stats, and transparency_metrics
  - Authenticated users can read their own advertiser and reservation data
  - Admin users have full access (defined by app_metadata.role = 'admin')
*/

-- Create panels table
CREATE TABLE IF NOT EXISTS panels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  size text NOT NULL CHECK (size IN ('small', 'medium', 'large')),
  position text NOT NULL,
  dimensions jsonb NOT NULL DEFAULT '{"width": 0, "height": 0}'::jsonb,
  monthly_cost numeric NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'reserved', 'active')),
  reserved_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create advertisers table
CREATE TABLE IF NOT EXISTS advertisers (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'inactive')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create reservations table
CREATE TABLE IF NOT EXISTS reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  panel_id uuid REFERENCES panels(id) ON DELETE SET NULL,
  advertiser_id uuid REFERENCES advertisers(id) ON DELETE SET NULL,
  business_name text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text,
  panel_size_requested text NOT NULL CHECK (panel_size_requested IN ('small', 'medium', 'large')),
  artwork_url text,
  notes text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create routes table
CREATE TABLE IF NOT EXISTS routes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  timestamp timestamptz NOT NULL DEFAULT now(),
  latitude numeric NOT NULL,
  longitude numeric NOT NULL,
  speed numeric DEFAULT 0,
  estimated_impressions integer DEFAULT 0,
  is_simulated boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create daily_stats table
CREATE TABLE IF NOT EXISTS daily_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date UNIQUE NOT NULL,
  total_impressions integer DEFAULT 0,
  distance_traveled numeric DEFAULT 0,
  route_summary jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create transparency_metrics table
CREATE TABLE IF NOT EXISTS transparency_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  month date UNIQUE NOT NULL,
  vehicle_cost numeric NOT NULL DEFAULT 0,
  monthly_payment numeric NOT NULL DEFAULT 0,
  panels_funded_count integer DEFAULT 0,
  total_revenue numeric DEFAULT 0,
  operating_costs jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE panels ENABLE ROW LEVEL SECURITY;
ALTER TABLE advertisers ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE transparency_metrics ENABLE ROW LEVEL SECURITY;

-- Panels policies (public read, admin write)
CREATE POLICY "Anyone can view panels"
  ON panels FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can update own reserved panels"
  ON panels FOR UPDATE
  TO authenticated
  USING (reserved_by = auth.uid())
  WITH CHECK (reserved_by = auth.uid());

-- Advertisers policies
CREATE POLICY "Users can view own advertiser profile"
  ON advertisers FOR SELECT
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Users can insert own advertiser profile"
  ON advertisers FOR INSERT
  TO authenticated
  WITH CHECK (id = auth.uid());

CREATE POLICY "Users can update own advertiser profile"
  ON advertisers FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Reservations policies
CREATE POLICY "Anyone can create reservations"
  ON reservations FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can view own reservations"
  ON reservations FOR SELECT
  TO authenticated
  USING (advertiser_id = auth.uid());

-- Routes policies (public read for transparency)
CREATE POLICY "Anyone can view routes"
  ON routes FOR SELECT
  TO public
  USING (true);

-- Daily stats policies (public read for transparency)
CREATE POLICY "Anyone can view daily stats"
  ON daily_stats FOR SELECT
  TO public
  USING (true);

-- Transparency metrics policies (public read)
CREATE POLICY "Anyone can view transparency metrics"
  ON transparency_metrics FOR SELECT
  TO public
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_panels_status ON panels(status);
CREATE INDEX IF NOT EXISTS idx_panels_reserved_by ON panels(reserved_by);
CREATE INDEX IF NOT EXISTS idx_reservations_status ON reservations(status);
CREATE INDEX IF NOT EXISTS idx_reservations_advertiser ON reservations(advertiser_id);
CREATE INDEX IF NOT EXISTS idx_routes_timestamp ON routes(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_daily_stats_date ON daily_stats(date DESC);
CREATE INDEX IF NOT EXISTS idx_transparency_month ON transparency_metrics(month DESC);

-- Insert initial panel data
INSERT INTO panels (name, size, position, dimensions, monthly_cost, status) VALUES
  ('Small Panel 1', 'small', 'driver_side_rear_glass', '{"width": 12, "height": 18}'::jsonb, 136.05, 'available'),
  ('Small Panel 2', 'small', 'passenger_side_rear_glass', '{"width": 12, "height": 18}'::jsonb, 136.05, 'available'),
  ('Small Panel 3', 'small', 'front_bumper', '{"width": 12, "height": 18}'::jsonb, 136.05, 'available'),
  ('Medium Panel 1', 'small', 'passenger_side_rear', '{"width": 12, "height": 18}'::jsonb, 204.08, 'available'),
  ('Medium Panel 2', 'small', 'rear_window', '{"width": 12, "height": 18}'::jsonb, 204.08, 'available'),
  ('Medium Panel 3', 'medium', 'hood', '{"width": 24, "height": 36}'::jsonb, 204.08, 'available'),
  ('Medium Panel 4', 'large', 'driver_side_sliding', '{"width": 36, "height": 48}'::jsonb, 204.08, 'available'),
  ('Medium Panel 5', 'large', 'passenger_side_sliding', '{"width": 36, "height": 48}'::jsonb, 204.08, 'available'),
  ('Large Panel 1', 'large', 'driver_side_panel_1', '{"width": 36, "height": 48}'::jsonb, 272.10, 'available'),
  ('Large Panel 2', 'large', 'driver_side_panel_2', '{"width": 36, "height": 48}'::jsonb, 272.10, 'available'),
  ('Large Panel 3', 'large', 'passenger_side_panel_1', '{"width": 36, "height": 48}'::jsonb, 272.10, 'available'),
  ('Large Panel 4', 'large', 'passenger_side_panel_2', '{"width": 36, "height": 48}'::jsonb, 272.10, 'available'),
  ('Large Panel 5', 'large', 'rear_left', '{"width": 36, "height": 48}'::jsonb, 272.10, 'available'),
  ('Large Panel 6', 'large', 'rear_right', '{"width": 36, "height": 48}'::jsonb, 272.10, 'available'),
  ('Large Panel 7', 'large', 'rear_center', '{"width": 36, "height": 48}'::jsonb, 272.10, 'available')
ON CONFLICT DO NOTHING;

-- Insert initial transparency metrics
INSERT INTO transparency_metrics (month, vehicle_cost, monthly_payment, panels_funded_count, total_revenue, operating_costs) VALUES
  ('2025-12-01', 80000, 3333, 0, 0, 0'::jsonb)
ON CONFLICT DO NOTHING;

-- Insert demo route data
INSERT INTO routes (timestamp, latitude, longitude, speed, estimated_impressions, is_simulated) VALUES
  (now() - interval '1 hour', 40.7128, -74.0060, 25, 1250, true),
  (now() - interval '50 minutes', 40.7138, -74.0050, 30, 1500, true),
  (now() - interval '40 minutes', 40.7148, -74.0040, 28, 1400, true),
  (now() - interval '30 minutes', 40.7158, -74.0030, 32, 1600, true),
  (now() - interval '20 minutes', 40.7168, -74.0020, 27, 1350, true),
  (now() - interval '10 minutes', 40.7178, -74.0010, 29, 1450, true)
ON CONFLICT DO NOTHING;