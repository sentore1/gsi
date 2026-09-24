-- Add membership type for businesses
CREATE TYPE membership_type AS ENUM ('basic', 'business', 'corporate');

-- Add membership_type column to businesses table
ALTER TABLE businesses 
ADD COLUMN membership_type membership_type DEFAULT 'basic',
ADD COLUMN membership_status TEXT DEFAULT 'pending', -- pending, active, expired
ADD COLUMN membership_expiry TIMESTAMPTZ;

-- Update existing records to have basic membership
UPDATE businesses SET membership_type = 'basic' WHERE membership_type IS NULL;

-- Add index for membership queries
CREATE INDEX idx_businesses_membership ON businesses(membership_type);

-- Comment for clarity
COMMENT ON COLUMN businesses.membership_type IS 'Type of GSI membership: basic (free), business, or corporate';
COMMENT ON COLUMN businesses.membership_status IS 'Status of membership: pending (awaiting setup), active, or expired';
COMMENT ON COLUMN businesses.membership_expiry IS 'Expiry date for business and corporate memberships';
