package database

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

// Database เก็บการเชื่อมต่อ
type Database struct {
	DB *sql.DB
}

// NewDatabase สร้าง database connection ใหม่
func NewDatabase(dbURL string) (*Database, error) {
	db, err := sql.Open("postgres", dbURL)
	if err != nil {
		return nil, fmt.Errorf("failed to open database: %w", err)
	}

	// ตรวจสอบการเชื่อมต่อ
	if err := db.Ping(); err != nil {
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	log.Println("✓ Connected to database successfully")

	return &Database{DB: db}, nil
}

// Close ปิดการเชื่อมต่อ
func (d *Database) Close() error {
	return d.DB.Close()
}

// InitializeDB สร้าง tables
func (d *Database) InitializeDB() error {
	schema := `
	CREATE TABLE IF NOT EXISTS insurance_selections (
		id SERIAL PRIMARY KEY,
		car_brand_code VARCHAR(50) NOT NULL,
		car_model_code VARCHAR(50) NOT NULL,
		car_submodel_code VARCHAR(100) NOT NULL,
		car_year INTEGER NOT NULL,
		insurance_type VARCHAR(10) NOT NULL,
		price NUMERIC(10, 2) NOT NULL,
		sum_insured NUMERIC(12, 2) NOT NULL,
    owner_id_card VARCHAR(20),
    owner_prefix VARCHAR(20),
    owner_first_name VARCHAR(100),
    owner_last_name VARCHAR(100),
    owner_birthdate DATE,
    owner_email VARCHAR(200),
    owner_phone VARCHAR(20),
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);

	-- สร้าง index สำหรับค้นหาที่เร็ว
	CREATE INDEX IF NOT EXISTS idx_car_selection 
	ON insurance_selections(car_brand_code, car_model_code, car_year);
	`

	_, err := d.DB.Exec(schema)
	if err != nil {
		return fmt.Errorf("failed to create schema: %w", err)
	}

	log.Println("✓ Database schema initialized")
	return nil
}
