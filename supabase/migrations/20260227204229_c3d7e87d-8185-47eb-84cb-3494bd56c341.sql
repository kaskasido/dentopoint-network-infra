
-- Add 'partner' to app_role enum
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'partner';

-- Create RPC function for automatic role assignment after signup
-- Reads intended_role from user metadata, prevents admin self-assignment
CREATE OR REPLACE FUNCTION public.assign_initial_role()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _intended_role text;
  _user_id uuid;
BEGIN
  _user_id := auth.uid();
  
  -- Skip if user already has a role
  IF EXISTS (SELECT 1 FROM user_roles WHERE user_id = _user_id) THEN
    RETURN;
  END IF;
  
  -- Read intended role from user metadata
  SELECT raw_user_meta_data->>'intended_role' INTO _intended_role
  FROM auth.users WHERE id = _user_id;
  
  -- Only allow non-admin roles to be self-assigned
  IF _intended_role IN ('clinic', 'manufacturer', 'investor', 'partner') THEN
    INSERT INTO user_roles (user_id, role)
    VALUES (_user_id, _intended_role::app_role);
  END IF;
END;
$$;
