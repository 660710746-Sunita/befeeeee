package handlers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"yourapp/models"
	"yourapp/repository"
)

type InsuranceHandler struct {
	repo *repository.InsuranceRepository
}

func NewInsuranceHandler(repo *repository.InsuranceRepository) *InsuranceHandler {
	return &InsuranceHandler{repo: repo}
}

func (h *InsuranceHandler) CreateInsuranceSelection(c *gin.Context) {
	var req models.CreateInsuranceSelectionRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: err.Error()})
		return
	}

	birthDate, _ := time.Parse("2006-01-02", req.BirthDate)

	data := models.InsuranceSelection{
		CarBrandCode:    req.CarBrandCode,
		CarModelCode:    req.CarModelCode,
		CarSubmodelCode: req.CarSubmodelCode,
		CarYear:         req.CarYear,
		InsuranceType:   req.InsuranceType,
		Price:           req.Price,
		SumInsured:      req.SumInsured,

		CitizenID: req.CitizenID,
		Title:     req.Title,
		FirstName: req.FirstName,
		LastName:  req.LastName,
		BirthDate: birthDate,
		Email:     req.Email,
		Phone:     req.Phone,
	}

	id, err := h.repo.CreateInsuranceSelection(data)
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: err.Error()})
		return
	}

	data.ID = id

	c.JSON(http.StatusOK, models.SuccessResponse{
		Message: "Created successfully",
		Data:    &data,
	})
}
