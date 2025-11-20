package main

import (
	"insurance-backend/internal/database"
	"insurance-backend/internal/handlers"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	// ตั้งค่า Gin mode
	gin.SetMode(gin.DebugMode)

	// สร้าง Gin router
	router := gin.Default()

	// CORS middleware
	router.Use(corsMiddleware())

	// สร้างการเชื่อมต่อ database
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		dbURL = "postgres://postgres:password@localhost:5432/insurance_db?sslmode=disable"
	}

	db, err := database.NewDatabase(dbURL)
	if err != nil {
		log.Fatalf("❌ Failed to connect to database: %v", err)
	}
	defer db.Close()

	// สร้าง schema
	if err := db.InitializeDB(); err != nil {
		log.Fatalf("❌ Failed to initialize database: %v", err)
	}

	// สร้าง repository และ handler
	insuranceRepo := database.NewInsuranceRepository(db)
	insuranceHandler := handlers.NewInsuranceHandler(insuranceRepo)

	// Health check
	router.GET("/api/health", insuranceHandler.HealthCheck)

	// Insurance Selection routes
	router.POST("/api/insurance-selection", insuranceHandler.CreateInsuranceSelection)
	router.GET("/api/insurance-selection/:id", insuranceHandler.GetInsuranceSelection)
	router.GET("/api/insurance-selections", insuranceHandler.GetAllInsuranceSelections)
	router.GET("/api/insurance-selections/brand/:brand", insuranceHandler.GetInsuranceSelectionsByBrand)
	router.PUT("/api/insurance-selection/:id", insuranceHandler.UpdateInsuranceSelection)
	router.DELETE("/api/insurance-selection/:id", insuranceHandler.DeleteInsuranceSelection)

	// 404 handler
	router.NoRoute(func(c *gin.Context) {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Route not found",
		})
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	if err := router.Run(":" + port); err != nil {
		log.Fatalf("❌ Failed to start server: %v", err)
	}
}

// corsMiddleware จัดการ CORS
func corsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
