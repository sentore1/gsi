-- Allow anonymous users to submit ratings (user_id will be null)
DROP POLICY IF EXISTS "Authenticated users can create ratings" ON ratings;

CREATE POLICY "Anyone can create ratings" ON ratings
  FOR INSERT WITH CHECK (
    auth.uid() = user_id OR user_id IS NULL
  );
