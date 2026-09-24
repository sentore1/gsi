-- Add payment tracking fields to businesses table
ALTER TABLE businesses 
ADD COLUMN payment_status TEXT DEFAULT 'pending', -- pending, verified, rejected
ADD COLUMN payment_amount DECIMAL(10, 2),
ADD COLUMN payment_proof_url TEXT,
ADD COLUMN payment_date TIMESTAMPTZ,
ADD COLUMN payment_verified_by UUID REFERENCES auth.users(id),
ADD COLUMN payment_verified_at TIMESTAMPTZ,
ADD COLUMN payment_rejection_reason TEXT;

-- Create index for payment status queries
CREATE INDEX idx_businesses_payment_status ON businesses(payment_status);

-- Create a payment_history table for tracking all payment transactions
CREATE TABLE payment_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  membership_type membership_type NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  payment_proof_url TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, verified, rejected
  verified_by UUID REFERENCES auth.users(id),
  verified_at TIMESTAMPTZ,
  rejection_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for payment history queries
CREATE INDEX idx_payment_history_business ON payment_history(business_id);
CREATE INDEX idx_payment_history_status ON payment_history(status);

-- Add RLS policies for payment_history
ALTER TABLE payment_history ENABLE ROW LEVEL SECURITY;

-- Admin can see all payment history
CREATE POLICY "Admins can view all payment history"
  ON payment_history
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Business owners can see their own payment history
CREATE POLICY "Business owners can view their payment history"
  ON payment_history
  FOR SELECT
  TO authenticated
  USING (
    business_id IN (
      SELECT id FROM businesses
      WHERE owner_id = auth.uid()
    )
  );

-- Admins can update payment status
CREATE POLICY "Admins can update payment history"
  ON payment_history
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_payment_history_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for payment_history updated_at
CREATE TRIGGER payment_history_updated_at
  BEFORE UPDATE ON payment_history
  FOR EACH ROW
  EXECUTE FUNCTION update_payment_history_updated_at();

-- Comments for clarity
COMMENT ON COLUMN businesses.payment_status IS 'Status of membership payment: pending (awaiting verification), verified (approved), or rejected';
COMMENT ON COLUMN businesses.payment_amount IS 'Amount paid for membership in RWF';
COMMENT ON COLUMN businesses.payment_proof_url IS 'URL to uploaded payment proof screenshot';
COMMENT ON COLUMN businesses.payment_date IS 'Date when payment was made by business';
COMMENT ON COLUMN businesses.payment_verified_by IS 'Admin user who verified the payment';
COMMENT ON COLUMN businesses.payment_verified_at IS 'Timestamp when payment was verified';
COMMENT ON COLUMN businesses.payment_rejection_reason IS 'Reason for payment rejection if applicable';

COMMENT ON TABLE payment_history IS 'Complete history of all membership payments for audit trail';
