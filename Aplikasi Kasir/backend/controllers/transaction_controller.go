package controllers

import (
	"backend/database"
	"backend/models"
	"github.com/gin-gonic/gin"
	"net/http"
)

func GetTransactions(c *gin.Context) {
	var transactions []models.Transaction
	database.DB.Preload("Items").Find(&transactions)
	c.JSON(http.StatusOK, transactions)
}

func CreateTransaction(c *gin.Context) {
	var transaction models.Transaction
	if err := c.ShouldBindJSON(&transaction); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	database.DB.Create(&transaction)
	c.JSON(http.StatusCreated, transaction)
}
