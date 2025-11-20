package repository

import (
	"fmt"

	"github.com/jmoiron/sqlx"
	"yourapp/models"
)

type InsuranceRepository struct {
	db *sqlx.DB
}

func NewInsuranceRepository(db *sqlx.DB) *InsuranceRepository {
	return &InsuranceRepository{db: db}
}

func (r *InsuranceRepository) CreateInsuranceSelection(i models.InsuranceSelection) (int, error) {

	query := `
	INSERT INTO insurance_selections
	(
		car_brand_code, car_model_code, car_submodel_code, car_year, insurance_type, price, sum_insured,
		citizen_id, title, first_name, last_name, birth_date, email, phone,
		created_at, updated_at
	)
	VALUES
	(
		:car_brand_code, :car_model_code, :car_submodel_code, :car_year, :insurance_type, :price, :sum_insured,
		:citizen_id, :title, :first_name, :last_name, :birth_date, :email, :phone,
		NOW(), NOW()
	)
	RETURNING id;
	`

	rows, err := r.db.NamedQuery(query, i)
	if err != nil {
		return 0, err
	}

	if rows.Next() {
		var id int
		rows.Scan(&id)
		return id, nil
	}

	return 0, fmt.Errorf("insert failed")
}
