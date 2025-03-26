package database

import (
    "backend/models"
    "gorm.io/driver/postgres"
    "gorm.io/gorm"
    "log"
)

var DB *gorm.DB

func ConnectDB() {
    dsn := "host=localhost user=postgres password=yourpassword dbname=kasir_toko_es port=5432 sslmode=disable"
    var err error
    DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil {
        log.Fatal("❌ Failed to connect to database:", err)
    }

    // Auto-migrate tables
    DB.AutoMigrate(&models.Product{}, &models.Transaction{})
}
