package controller

import (
	"github.com/B6230760/FlowerShop/entity"
	"github.com/gin-gonic/gin"
	"net/http"
)

func CreateCompare(c *gin.Context) {
	var compare entity.Compare
	// var store entity.Store
	if err := c.ShouldBindJSON(&compare); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// if tx := entity.DB().Where("id = ?", compare.StoreID).First(&store); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "Address not found"})
	// 	return 
	// }
	if err := entity.DB().Create(&compare).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": compare})
}

func GetCompare(c *gin.Context) {
	var compare entity.Compare
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM compares WHERE id = ?",
		id).Scan(&compare).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": compare})
}

func ListCompares(c *gin.Context) {
	var compares []entity.Compare
	if err := entity.DB().Preload("Store").Find(&compares).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": compares})
}

func DeleteCompare(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM compares WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "compare not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

func UpdateCompare(c *gin.Context) {
	var compare entity.Compare
	if err := c.ShouldBindJSON(&compare); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", compare.ID).First(&compare); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "compare not found"})
		return
	}
	if err := entity.DB().Save(&compare).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": compare})
}
