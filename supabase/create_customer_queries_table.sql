-- Create customer_queries table for storing contact form submissions
CREATE TABLE IF NOT EXISTS customer_queries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  subject VARCHAR(255),
  message TEXT NOT NULL,
  order_number VARCHAR(100),
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_customer_queries_email ON customer_queries(email);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_customer_queries_status ON customer_queries(status);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_customer_queries_created_at ON customer_queries(created_at DESC);

-- Enable Row Level Security
ALTER TABLE customer_queries ENABLE ROW LEVEL SECURITY;

-- Create policy to allow INSERT from anyone (for contact form)
CREATE POLICY "Anyone can insert customer queries" ON customer_queries
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow SELECT for authenticated users only
CREATE POLICY "Authenticated users can view customer queries" ON customer_queries
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Create trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_customer_queries_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_customer_queries_timestamp
  BEFORE UPDATE ON customer_queries
  FOR EACH ROW
  EXECUTE FUNCTION update_customer_queries_updated_at();