package models

import "time"

// InsuranceSelection แสดงการเลือกประกัน
type InsuranceSelection struct {
	ID             int       `json:"id" db:"id"`
	CarBrandCode   string    `json:"car_brand_code" db:"car_brand_code"`
	CarModelCode   string    `json:"car_model_code" db:"car_model_code"`
	CarSubmodelCode string   `json:"car_submodel_code" db:"car_submodel_code"`
	CarYear        int       `json:"car_year" db:"car_year"`
	InsuranceType  string    `json:"insurance_type" db:"insurance_type"` // "2+", "3", "3+"
	Price          float64   `json:"price" db:"price"`
	SumInsured     *float64   `json:"sum_insured" db:"sum_insured"`
	CreatedAt      time.Time `json:"created_at" db:"created_at"`
	UpdatedAt      time.Time `json:"updated_at" db:"updated_at"`
}

// CreateInsuranceSelectionRequest ลิเควสต์สำหรับสร้างการเลือก
type CreateInsuranceSelectionRequest struct {
	CarBrandCode    string  `json:"car_brand_code" binding:"required"`
	CarModelCode    string  `json:"car_model_code" binding:"required"`
	CarSubmodelCode string  `json:"car_submodel_code" binding:"required"`
	CarYear         int     `json:"car_year" binding:"required"`
	InsuranceType   string  `json:"insurance_type" binding:"required"` // "2+", "3", "3+"
	Price           float64 `json:"price" binding:"required"`
	SumInsured      *float64 `json:"sum_insured" binding:"required"`
}

// ErrorResponse สำหรับการตอบกลับ error
type ErrorResponse struct {
	Error string `json:"error"`
}

// SuccessResponse สำหรับการตอบกลับสำเร็จ
type SuccessResponse struct {
	Message string              `json:"message"`
	Data    *InsuranceSelection `json:"data"`
}
