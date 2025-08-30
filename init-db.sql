-- Database initialization script
-- This script runs after create_tables.sql

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_service_owners_phone ON service_owners(phone);
CREATE INDEX IF NOT EXISTS idx_teams_phone ON teams(phone);
CREATE INDEX IF NOT EXISTS idx_charges_owner_id ON charges(owner_id);
CREATE INDEX IF NOT EXISTS idx_charge_team_members_charge_id ON charge_team_members(charge_id);
CREATE INDEX IF NOT EXISTS idx_charge_team_members_team_id ON charge_team_members(team_id);

-- Insert some test data for development (optional)
-- Uncomment the following lines if you want test data

-- INSERT INTO service_owners (id, name, phone, pix_key, created_at, updated_at) 
-- VALUES 
--   ('01HGJ2K3L4M5N6P7Q8R9S0T1U2', 'Test Admin', '+5511999999999', 'test@pix.com', NOW(), NOW())
-- ON CONFLICT (phone) DO NOTHING;

-- Add any other initialization logic here
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO caloteiros;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO caloteiros;