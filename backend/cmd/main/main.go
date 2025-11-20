package main

import (
	"insurance-backend/internal/database"
	"insurance-backend/internal/handlers"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {

	gin.SetMode(gin.DebugMode)
	router := gin.Default()

	// ✅ CORS ที่ถูกต้อง 100%
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "http://127.0.0.1:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// 🔗 DB
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		dbURL = "postgres://postgres:password@localhost:5432/insurance_db?sslmode=disable"
	}

	db, err := database.NewDatabase(dbURL)
	if err != nil {
		log.Fatalf("❌ Failed to connect to database: %v", err)
	}
	defer db.Close()

	if err := db.InitializeDB(); err != nil {
		log.Fatalf("❌ Failed to initialize database: %v", err)
	}

	insuranceRepo := database.NewInsuranceRepository(db)
	insuranceHandler := handlers.NewInsuranceHandler(insuranceRepo)

	// Routes
	router.GET("/api/health", insuranceHandler.HealthCheck)
	router.POST("/api/insurance-selection", insuranceHandler.CreateInsuranceSelection)
	router.GET("/api/insurance-selection/:id", insuranceHandler.GetInsuranceSelection)
	router.GET("/api/insurance-selections", insuranceHandler.GetAllInsuranceSelections)
	router.GET("/api/insurance-selections/brand/:brand", insuranceHandler.GetInsuranceSelectionsByBrand)
	router.PUT("/api/insurance-selection/:id", insuranceHandler.UpdateInsuranceSelection)
	router.DELETE("/api/insurance-selection/:id", insuranceHandler.DeleteInsuranceSelection)

	// 404
	router.NoRoute(func(c *gin.Context) {
		c.JSON(http.StatusNotFound, gin.H{"error": "Route not found"})
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	if err := router.Run(":" + port); err != nil {
		log.Fatalf("❌ Failed to start server: %v", err)
	}
}
