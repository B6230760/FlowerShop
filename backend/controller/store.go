package controller

import (
	"github.com/B6230760/FlowerShop/entity"
	"github.com/gin-gonic/gin"
	"net/http"
)

func CreateStore(c *gin.Context) {
	var store entity.Store
	if err := c.ShouldBindJSON(&store); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&store).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": store})
}

func GetStore(c *gin.Context) {
	var store entity.Store
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM stores WHERE id = ?", id).Scan(&store).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": store})
}

func ListStores(c *gin.Context) {
	var stores []entity.Store
	if err := entity.DB().Raw("SELECT * FROM stores").Scan(&stores).Error; err !=
		nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": stores})
}

func DeleteStore(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM stores WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "store not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// func UpdateStore(c *gin.Context) {
// 	var store entity.Store
// 	if err := c.ShouldBindJSON(&store); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	if tx := entity.DB().Where("id = ?", store.ID).First(&store); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "store not found"})
// 		return
// 	}
// 	if err := entity.DB().Save(&store).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": store})
// }

func UpdateStore(c *gin.Context) {
	var store entity.Store
	id := c.Param("id")

	if err := entity.DB().First(&store, id).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Store not found!",
		})
		return
	}

	var req struct {
		Amount int `json:"Amount"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	if store.Amount < req.Amount {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request: store.Amount should not be greater than req.Amount",
		})
		return
	}

	store.Amount = req.Amount

	if err := entity.DB().Save(&store).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Cannot update store!",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": "Store updated successfully!",
	})
}


