package database

import (
	"fmt"
	"insurance-backend/internal/models"
	"log"
	"time"
)

// InsuranceRepository ควบคุมการจัดการข้อมูลประกัน
type InsuranceRepository struct {
	*Database
}

// NewInsuranceRepository สร้าง repository ใหม่
func NewInsuranceRepository(db *Database) *InsuranceRepository {
	return &InsuranceRepository{Database: db}
}

// CreateInsuranceSelection สร้างการเลือกประกันใหม่
func (r *InsuranceRepository) CreateInsuranceSelection(req *models.CreateInsuranceSelectionRequest) (*models.InsuranceSelection, error) {
	selection := &models.InsuranceSelection{
		CarBrandCode:    req.CarBrandCode,
		CarModelCode:    req.CarModelCode,
		CarSubmodelCode: req.CarSubmodelCode,
		CarYear:         req.CarYear,
		InsuranceType:   req.InsuranceType,
		Price:           req.Price,
		SumInsured:      req.SumInsured,

		// ⭐ ข้อมูลเจ้าของรถจาก React
		OwnerIDCard:    req.OwnerIDCard,
		OwnerPrefix:    req.OwnerPrefix,
		OwnerFirstName: req.OwnerFirstName,
		OwnerLastName:  req.OwnerLastName,
		OwnerBirthdate: req.OwnerBirthdate,
		OwnerEmail:     req.OwnerEmail,
		OwnerPhone:     req.OwnerPhone,

		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	query := `
	INSERT INTO insurance_selections 
	(car_brand_code, car_model_code, car_submodel_code, car_year, 
	 insurance_type, price, sum_insured,
	 owner_id_card, owner_prefix, owner_first_name, owner_last_name,
	 owner_birthdate, owner_email, owner_phone)
	VALUES ($1, $2, $3, $4, $5, $6, $7,
			$8, $9, $10, $11, $12, $13, $14)
	RETURNING id, created_at, updated_at
	`

	err := r.DB.QueryRow(
		query,
		selection.CarBrandCode,
		selection.CarModelCode,
		selection.CarSubmodelCode,
		selection.CarYear,
		selection.InsuranceType,
		selection.Price,
		selection.SumInsured,
		selection.OwnerIDCard,
		selection.OwnerPrefix,
		selection.OwnerFirstName,
		selection.OwnerLastName,
		selection.OwnerBirthdate,
		selection.OwnerEmail,
		selection.OwnerPhone,
	).Scan(&selection.ID, &selection.CreatedAt, &selection.UpdatedAt)

	if err != nil {
		return nil, fmt.Errorf("failed to create insurance selection: %w", err)
	}

	log.Printf("✓ Created insurance selection: ID=%d, Type=%s, Brand=%s",
		selection.ID, selection.InsuranceType, selection.CarBrandCode)

	return selection, nil
}

// GetInsuranceSelection ดึงข้อมูลการเลือก
func (r *InsuranceRepository) GetInsuranceSelection(id int) (*models.InsuranceSelection, error) {
	selection := &models.InsuranceSelection{}

	query := `
		SELECT 
			id, car_brand_code, car_model_code, car_submodel_code, car_year,
			insurance_type, price, sum_insured,
			owner_id_card, owner_prefix, owner_first_name, owner_last_name,
			owner_birthdate, owner_email, owner_phone,
			created_at, updated_at
		FROM insurance_selections
		WHERE id = $1
	`

	err := r.DB.QueryRow(query, id).Scan(
		&selection.ID,
		&selection.CarBrandCode,
		&selection.CarModelCode,
		&selection.CarSubmodelCode,
		&selection.CarYear,
		&selection.InsuranceType,
		&selection.Price,
		&selection.SumInsured,
		&selection.OwnerIDCard,
		&selection.OwnerPrefix,
		&selection.OwnerFirstName,
		&selection.OwnerLastName,
		&selection.OwnerBirthdate,
		&selection.OwnerEmail,
		&selection.OwnerPhone,
		&selection.CreatedAt,
		&selection.UpdatedAt,
	)

	if err != nil {
		return nil, fmt.Errorf("failed to get insurance selection: %w", err)
	}

	return selection, nil
}


// GetAllInsuranceSelections ดึงข้อมูลการเลือกทั้งหมด
func (r *InsuranceRepository) GetAllInsuranceSelections(limit, offset int) ([]models.InsuranceSelection, error) {
	selections := []models.InsuranceSelection{}

	query := `
    SELECT id, car_brand_code, car_model_code, car_submodel_code, car_year,
           insurance_type, price, sum_insured,
           owner_id_card, owner_prefix, owner_first_name, owner_last_name,
           owner_birthdate, owner_email, owner_phone,
           created_at, updated_at
    FROM insurance_selections
    ORDER BY created_at DESC
    LIMIT $1 OFFSET $2
`


	rows, err := r.DB.Query(query, limit, offset)
	if err != nil {
		return nil, fmt.Errorf("failed to get insurance selections: %w", err)
	}
	defer rows.Close()

	for rows.Next() {
		var selection models.InsuranceSelection
err := rows.Scan(
    &selection.ID,
    &selection.CarBrandCode,
    &selection.CarModelCode,
    &selection.CarSubmodelCode,
    &selection.CarYear,
    &selection.InsuranceType,
    &selection.Price,
    &selection.SumInsured,

    &selection.OwnerIDCard,
    &selection.OwnerPrefix,
    &selection.OwnerFirstName,
    &selection.OwnerLastName,
    &selection.OwnerBirthdate,
    &selection.OwnerEmail,
    &selection.OwnerPhone,

    &selection.CreatedAt,
    &selection.UpdatedAt,
)
		if err != nil {
			return nil, fmt.Errorf("failed to scan insurance selection: %w", err)
		}
		selections = append(selections, selection)
	}

	return selections, nil
}

// GetInsuranceSelectionsByBrand ดึงข้อมูลการเลือกตามยี่ห้อ
func (r *InsuranceRepository) GetInsuranceSelectionsByBrand(brandCode string) ([]models.InsuranceSelection, error) {
	selections := []models.InsuranceSelection{}

	query := `
		SELECT 
			id, car_brand_code, car_model_code, car_submodel_code, car_year,
			insurance_type, price, sum_insured,
			owner_id_card, owner_prefix, owner_first_name, owner_last_name,
			owner_birthdate, owner_email, owner_phone,
			created_at, updated_at
		FROM insurance_selections
		WHERE car_brand_code = $1
		ORDER BY created_at DESC
	`

	rows, err := r.DB.Query(query, brandCode)
	if err != nil {
		return nil, fmt.Errorf("failed to get insurance selections: %w", err)
	}
	defer rows.Close()

	for rows.Next() {
		var selection models.InsuranceSelection
		err := rows.Scan(
			&selection.ID,
			&selection.CarBrandCode,
			&selection.CarModelCode,
			&selection.CarSubmodelCode,
			&selection.CarYear,
			&selection.InsuranceType,
			&selection.Price,
			&selection.SumInsured,
			&selection.OwnerIDCard,
			&selection.OwnerPrefix,
			&selection.OwnerFirstName,
			&selection.OwnerLastName,
			&selection.OwnerBirthdate,
			&selection.OwnerEmail,
			&selection.OwnerPhone,
			&selection.CreatedAt,
			&selection.UpdatedAt,
		)
		if err != nil {
			return nil, fmt.Errorf("failed to scan insurance selection: %w", err)
		}
		selections = append(selections, selection)
	}

	return selections, nil
}

// UpdateInsuranceSelection อัปเดตการเลือก
func (r *InsuranceRepository) UpdateInsuranceSelection(id int, req *models.CreateInsuranceSelectionRequest) (*models.InsuranceSelection, error) {
	query := `
		UPDATE insurance_selections
		SET car_brand_code = $1, car_model_code = $2, car_submodel_code = $3, 
		    car_year = $4, insurance_type = $5, price = $6, sum_insured = $7, updated_at = NOW()
		WHERE id = $8
		RETURNING id, car_brand_code, car_model_code, car_submodel_code, car_year, 
		          insurance_type, price, sum_insured, created_at, updated_at
	`

	selection := &models.InsuranceSelection{}
	err := r.DB.QueryRow(
		query,
		req.CarBrandCode,
		req.CarModelCode,
		req.CarSubmodelCode,
		req.CarYear,
		req.InsuranceType,
		req.Price,
		req.SumInsured,
		id,
	).Scan(
		&selection.ID,
		&selection.CarBrandCode,
		&selection.CarModelCode,
		&selection.CarSubmodelCode,
		&selection.CarYear,
		&selection.InsuranceType,
		&selection.Price,
		&selection.SumInsured,
		&selection.CreatedAt,
		&selection.UpdatedAt,
	)

	if err != nil {
		return nil, fmt.Errorf("failed to update insurance selection: %w", err)
	}

	log.Printf("✓ Updated insurance selection: ID=%d", id)
	return selection, nil
}

// DeleteInsuranceSelection ลบการเลือก
func (r *InsuranceRepository) DeleteInsuranceSelection(id int) error {
	query := `DELETE FROM insurance_selections WHERE id = $1`

	result, err := r.DB.Exec(query, id)
	if err != nil {
		return fmt.Errorf("failed to delete insurance selection: %w", err)
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("failed to get rows affected: %w", err)
	}

	if rowsAffected == 0 {
		return fmt.Errorf("insurance selection not found")
	}

	log.Printf("✓ Deleted insurance selection: ID=%d", id)
	return nil
}
