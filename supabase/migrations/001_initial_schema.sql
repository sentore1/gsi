-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_type AS ENUM ('individual', 'business', 'admin');
CREATE TYPE rating_status AS ENUM ('verified', 'pending', 'flagged', 'rejected');

-- Users table (extends Supabase auth.users)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  user_type user_type DEFAULT 'individual',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Businesses table
CREATE TABLE businesses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  location TEXT,
  phone TEXT,
  website TEXT,
  logo_url TEXT,
  owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
  is_gsi_member BOOLEAN DEFAULT FALSE,
  member_since TIMESTAMPTZ,
  overall_rating DECIMAL(3,2),
  total_ratings INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ratings table
CREATE TABLE ratings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  entrance DECIMAL(2,1) CHECK (entrance >= 1 AND entrance <= 5),
  interaction DECIMAL(2,1) CHECK (interaction >= 1 AND interaction <= 5),
  heart_factor DECIMAL(2,1) CHECK (heart_factor >= 1 AND heart_factor <= 5),
  responsiveness DECIMAL(2,1) CHECK (responsiveness >= 1 AND responsiveness <= 5),
  problem_resolution DECIMAL(2,1) CHECK (problem_resolution >= 1 AND problem_resolution <= 5),
  exit DECIMAL(2,1) CHECK (exit >= 1 AND exit <= 5),
  overall_rating DECIMAL(3,2) NOT NULL CHECK (overall_rating >= 1 AND overall_rating <= 5),
  comment TEXT,
  status rating_status DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rating categories aggregated view
CREATE TABLE rating_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE UNIQUE,
  entrance_avg DECIMAL(3,2),
  interaction_avg DECIMAL(3,2),
  heart_factor_avg DECIMAL(3,2),
  responsiveness_avg DECIMAL(3,2),
  problem_resolution_avg DECIMAL(3,2),
  exit_avg DECIMAL(3,2),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Business responses to ratings
CREATE TABLE business_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  rating_id UUID REFERENCES ratings(id) ON DELETE CASCADE,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  response_text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_businesses_category ON businesses(category);
CREATE INDEX idx_businesses_owner ON businesses(owner_id);
CREATE INDEX idx_businesses_rating ON businesses(overall_rating DESC);
CREATE INDEX idx_ratings_business ON ratings(business_id);
CREATE INDEX idx_ratings_user ON ratings(user_id);
CREATE INDEX idx_ratings_status ON ratings(status);
CREATE INDEX idx_ratings_created ON ratings(created_at DESC);

-- Function to update business ratings
CREATE OR REPLACE FUNCTION update_business_ratings()
RETURNS TRIGGER AS $$
BEGIN
  -- Update rating_categories
  INSERT INTO rating_categories (business_id, entrance_avg, interaction_avg, heart_factor_avg, 
                                  responsiveness_avg, problem_resolution_avg, exit_avg)
  SELECT 
    NEW.business_id,
    AVG(entrance),
    AVG(interaction),
    AVG(heart_factor),
    AVG(responsiveness),
    AVG(problem_resolution),
    AVG(exit)
  FROM ratings
  WHERE business_id = NEW.business_id AND status = 'verified'
  ON CONFLICT (business_id) 
  DO UPDATE SET
    entrance_avg = EXCLUDED.entrance_avg,
    interaction_avg = EXCLUDED.interaction_avg,
    heart_factor_avg = EXCLUDED.heart_factor_avg,
    responsiveness_avg = EXCLUDED.responsiveness_avg,
    problem_resolution_avg = EXCLUDED.problem_resolution_avg,
    exit_avg = EXCLUDED.exit_avg,
    updated_at = NOW();

  -- Update overall business rating
  UPDATE businesses
  SET 
    overall_rating = (
      SELECT AVG(overall_rating)
      FROM ratings
      WHERE business_id = NEW.business_id AND status = 'verified'
    ),
    total_ratings = (
      SELECT COUNT(*)
      FROM ratings
      WHERE business_id = NEW.business_id AND status = 'verified'
    )
  WHERE id = NEW.business_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update ratings when new rating is added or updated
CREATE TRIGGER trigger_update_business_ratings
AFTER INSERT OR UPDATE ON ratings
FOR EACH ROW
EXECUTE FUNCTION update_business_ratings();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_businesses_updated_at BEFORE UPDATE ON businesses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ratings_updated_at BEFORE UPDATE ON ratings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE rating_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_responses ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for businesses
CREATE POLICY "Anyone can view businesses" ON businesses
  FOR SELECT USING (true);

CREATE POLICY "Business owners can update their business" ON businesses
  FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Authenticated users can create businesses" ON businesses
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

-- RLS Policies for ratings
CREATE POLICY "Anyone can view verified ratings" ON ratings
  FOR SELECT USING (status = 'verified' OR auth.uid() = user_id);

CREATE POLICY "Authenticated users can create ratings" ON ratings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ratings" ON ratings
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for rating_categories
CREATE POLICY "Anyone can view rating categories" ON rating_categories
  FOR SELECT USING (true);

-- RLS Policies for business_responses
CREATE POLICY "Anyone can view business responses" ON business_responses
  FOR SELECT USING (true);

CREATE POLICY "Business owners can create responses" ON business_responses
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM businesses 
      WHERE businesses.id = business_id 
      AND businesses.owner_id = auth.uid()
    )
  );
