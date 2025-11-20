package models

import "time"

// InsuranceSelection แสดงการเลือกประกัน
type InsuranceSelection struct {
	ID               int       `json:"id" db:"id"`
	CarBrandCode     string    `json:"car_brand_code" db:"car_brand_code"`
	CarModelCode     string    `json:"car_model_code" db:"car_model_code"`
	CarSubmodelCode  string    `json:"car_submodel_code" db:"car_submodel_code"`
	CarYear          int       `json:"car_year" db:"car_year"`
	InsuranceType    string    `json:"insurance_type" db:"insurance_type"`
	Price            float64   `json:"price" db:"price"`
	SumInsured       float64   `json:"sum_insured" db:"sum_insured"`

	// ⭐ ข้อมูลเจ้าของรถ
	CitizenID        string    `json:"citizen_id" db:"citizen_id"`
	Title            string    `json:"title" db:"title"`
	FirstName        string    `json:"first_name" db:"first_name"`
	LastName         string    `json:"last_name" db:"last_name"`
	BirthDate        time.Time `json:"birth_date" db:"birth_date"`
	Email            string    `json:"email" db:"email"`
	Phone            string    `json:"phone" db:"phone"`

	CreatedAt        time.Time `json:"created_at" db:"created_at"`
	UpdatedAt        time.Time `json:"updated_at" db:"updated_at"`
}

// CreateInsuranceSelectionRequest รับข้อมูลจาก Frontend
type CreateInsuranceSelectionRequest struct {
	CarBrandCode     string  `json:"car_brand_code" binding:"required"`
	CarModelCode     string  `json:"car_model_code" binding:"required"`
	CarSubmodelCode  string  `json:"car_submodel_code" binding:"required"`
	CarYear          int     `json:"car_year" binding:"required"`
	InsuranceType    string  `json:"insurance_type" binding:"required"`
	Price            float64 `json:"price" binding:"required"`
	SumInsured       float64 `json:"sum_insured" binding:"required"`

	// ⭐ ฟิลด์เจ้าของรถ
	CitizenID        string  `json:"citizen_id" binding:"required"`
	Title            string  `json:"title" binding:"required"`
	FirstName        string  `json:"first_name" binding:"required"`
	LastName         string  `json:"last_name" binding:"required"`
	BirthDate        string  `json:"birth_date" binding:"required"`
	Email            string  `json:"email" binding:"required,email"`
	Phone            string  `json:"phone" binding:"required"`
}

type ErrorResponse struct {
	Error string `json:"error"`
}

type SuccessResponse struct {
	Message string              `json:"message"`
	Data    *InsuranceSelection `json:"data"`
}
