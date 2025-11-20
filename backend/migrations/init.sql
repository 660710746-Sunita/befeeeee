-- Create insurance_selections table
CREATE TABLE IF NOT EXISTS insurance_selections (
    id SERIAL PRIMARY KEY,
    
    -- Existing fields
    car_brand_code VARCHAR(50) NOT NULL,
    car_model_code VARCHAR(50) NOT NULL,
    car_submodel_code VARCHAR(100) NOT NULL,
    car_year INTEGER NOT NULL,
    insurance_type VARCHAR(10) NOT NULL CHECK (insurance_type IN ('2+', '3', '3+')),
    price NUMERIC(10, 2) NOT NULL,
    sum_insured NUMERIC(12, 2) NOT NULL,

    -- NEW: Customer info fields
    citizen_id VARCHAR(20),
    title VARCHAR(20),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    birth_date DATE,
    email VARCHAR(255),
    phone VARCHAR(20),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_car_selection 
ON insurance_selections(car_brand_code, car_model_code, car_year);

CREATE INDEX IF NOT EXISTS idx_insurance_type 
ON insurance_selections(insurance_type);

CREATE INDEX IF NOT EXISTS idx_created_at 
ON insurance_selections(created_at DESC);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_insurance_selections_updated_at ON insurance_selections;
CREATE TRIGGER update_insurance_selections_updated_at BEFORE UPDATE
    ON insurance_selections
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
