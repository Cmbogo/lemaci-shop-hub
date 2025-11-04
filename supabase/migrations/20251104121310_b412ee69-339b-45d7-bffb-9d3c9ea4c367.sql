-- Create products table for the Lemaci shop
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  category TEXT,
  stock INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policy to allow everyone to view products (public shop)
CREATE POLICY "Anyone can view products"
ON public.products
FOR SELECT
USING (true);

-- Create index for faster queries
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_products_featured ON public.products(featured);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample products
INSERT INTO public.products (name, description, price, image_url, category, stock, featured) VALUES
('Wireless Bluetooth Headphones', 'Premium noise-canceling headphones with 30-hour battery life', 4500.00, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800', 'Electronics', 15, true),
('Smart Watch Pro', 'Advanced fitness tracking with heart rate monitor and GPS', 8900.00, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800', 'Electronics', 20, true),
('Laptop Backpack', 'Water-resistant backpack with USB charging port', 2500.00, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800', 'Accessories', 30, false),
('Wireless Mouse', 'Ergonomic design with precision tracking', 1200.00, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800', 'Electronics', 45, false),
('Phone Stand', 'Adjustable aluminum phone holder for desk', 800.00, 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800', 'Accessories', 60, false),
('USB-C Hub', '7-in-1 USB-C adapter with HDMI and SD card reader', 3200.00, 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=800', 'Electronics', 25, true);