package models

import "time"


type InsuranceSelection struct {
	ID               int       `json:"id" db:"id"`
	CarBrandCode     string    `json:"car_brand_code" db:"car_brand_code"`
	CarModelCode     string    `json:"car_model_code" db:"car_model_code"`
	CarSubmodelCode  string    `json:"car_submodel_code" db:"car_submodel_code"`
	CarYear          int       `json:"car_year" db:"car_year"`
	InsuranceType    string    `json:"insurance_type" db:"insurance_type"` // "2+", "3", "3+"
	Price            float64   `json:"price" db:"price"`
	SumInsured       float64   `json:"sum_insured" db:"sum_insured"`


	OwnerIDCard      string    `json:"owner_id_card" db:"owner_id_card"`
	OwnerPrefix      string    `json:"owner_prefix" db:"owner_prefix"`
	OwnerFirstName   string    `json:"owner_first_name" db:"owner_first_name"`
	OwnerLastName    string    `json:"owner_last_name" db:"owner_last_name"`
	OwnerBirthdate   string    `json:"owner_birthdate" db:"owner_birthdate"`
	OwnerEmail       string    `json:"owner_email" db:"owner_email"`
	OwnerPhone       string    `json:"owner_phone" db:"owner_phone"`

	CreatedAt        time.Time `json:"created_at" db:"created_at"`
	UpdatedAt        time.Time `json:"updated_at" db:"updated_at"`
}


type CreateInsuranceSelectionRequest struct {
    CarBrandCode     string  `json:"car_brand_code" binding:"required"`
    CarModelCode     string  `json:"car_model_code" binding:"required"`
    CarSubmodelCode  string  `json:"car_submodel_code" binding:"required"`
    CarYear          int     `json:"car_year" binding:"required"`
    InsuranceType    string  `json:"insurance_type" binding:"required"`

    // ❗ เอา required ออก ไม่งั้นชั้น 3 ส่งไม่ได้
    Price            float64 `json:"price"`
    SumInsured       float64 `json:"sum_insured"`

    OwnerIDCard      string  `json:"owner_id_card"`
    OwnerPrefix      string  `json:"owner_prefix"`
    OwnerFirstName   string  `json:"owner_first_name"`
    OwnerLastName    string  `json:"owner_last_name"`
    OwnerBirthdate   string  `json:"owner_birthdate"`
    OwnerEmail       string  `json:"owner_email"`
    OwnerPhone       string  `json:"owner_phone"`
}



type ErrorResponse struct {
	Error string `json:"error"`
}


type SuccessResponse struct {
	Message string              `json:"message"`
	Data    *InsuranceSelection `json:"data"`
}
