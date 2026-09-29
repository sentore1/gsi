-- Allow users to read their own user_type (needed for role-based redirect on login)
CREATE POLICY "Users can view their own user_type"
  ON public.users
  FOR SELECT
  USING (auth.uid() = id);
