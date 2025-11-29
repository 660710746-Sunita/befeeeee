package handlers

import (
	"insurance-backend/internal/database"
	"insurance-backend/internal/models"
	"net/http"
	"strconv"
	"log"
	"github.com/gin-gonic/gin"
)


type InsuranceHandler struct {
	repo *database.InsuranceRepository
}


func NewInsuranceHandler(repo *database.InsuranceRepository) *InsuranceHandler {
	return &InsuranceHandler{repo: repo}
}


func (h *InsuranceHandler) CreateInsuranceSelection(c *gin.Context) {
	var req models.CreateInsuranceSelectionRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{
			Error: "Invalid request body: " + err.Error(),
		})
		return
	}

selection, err := h.repo.CreateInsuranceSelection(&req)
if err != nil {

    log.Println("Error creating insurance selection:", err)

    c.JSON(http.StatusInternalServerError, models.ErrorResponse{
        Error: err.Error(),
    })
    return
}

	c.JSON(http.StatusCreated, models.SuccessResponse{
		Message: "Insurance selection created successfully",
		Data:    selection,
	})
}

//get1
func (h *InsuranceHandler) GetInsuranceSelection(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{
			Error: "Invalid ID",
		})
		return
	}

	selection, err := h.repo.GetInsuranceSelection(id)
	if err != nil {
		c.JSON(http.StatusNotFound, models.ErrorResponse{
			Error: "Insurance selection not found",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": selection,
	})
}

//all
func (h *InsuranceHandler) GetAllInsuranceSelections(c *gin.Context) {
	limitStr := c.DefaultQuery("limit", "10")
	offsetStr := c.DefaultQuery("offset", "0")

	limit, err := strconv.Atoi(limitStr)
	if err != nil || limit < 1 || limit > 100 {
		limit = 10
	}

	offset, err := strconv.Atoi(offsetStr)
	if err != nil || offset < 0 {
		offset = 0
	}

	selections, err := h.repo.GetAllInsuranceSelections(limit, offset)
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{
			Error: err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data":  selections,
		"limit": limit,
		"offset": offset,
	})
}

//getbrand
func (h *InsuranceHandler) GetInsuranceSelectionsByBrand(c *gin.Context) {
	brand := c.Param("brand")

	selections, err := h.repo.GetInsuranceSelectionsByBrand(brand)
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{
			Error: err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data":  selections,
		"brand": brand,
	})
}


func (h *InsuranceHandler) UpdateInsuranceSelection(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{
			Error: "Invalid ID",
		})
		return
	}

	var req models.CreateInsuranceSelectionRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{
			Error: "Invalid request body: " + err.Error(),
		})
		return
	}

	selection, err := h.repo.UpdateInsuranceSelection(id, &req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{
			Error: err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, models.SuccessResponse{
		Message: "Insurance selection updated successfully",
		Data:    selection,
	})
}

//del
func (h *InsuranceHandler) DeleteInsuranceSelection(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{
			Error: "Invalid ID",
		})
		return
	}

	err = h.repo.DeleteInsuranceSelection(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{
			Error: err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Insurance selection deleted successfully",
	})
}

//check
func (h *InsuranceHandler) HealthCheck(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"status": "healthy",
	})
}
