package controller

import (
	"fmt"
	"net/http"

	"github.com/B6230760/FlowerShop/entity"
	"github.com/gin-gonic/gin"
)

func CreateCart(c *gin.Context) {
	var Status entity.Status
	var Store entity.Store
	var Cart entity.Cart
	var User entity.User
	if err := c.ShouldBindJSON(&Cart); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	if tx := entity.DB().Where("id = ?",Cart.StoreID).First(&Store); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Store not found"})
		return
	}

	if tx := entity.DB().Where("id = ?",Cart.StatusID).First(&Status); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Status not found"})
		return
	}
	if tx := entity.DB().Where("id = ?",Cart.UserID).First(&User); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found"})
		return
	}
	
	fmt.Print(Cart.StatusID);



	ac := entity.Cart{
		Store: Store,
		Item: Cart.Item,
		Status: Status,
		User: User,
	}

	if err := entity.DB().Create(&ac).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ac})
}


func GetCart(c *gin.Context) {
	var cart entity.Cart
	id := c.Param("id")
	if err := entity.DB().Preload("Store").Raw("SELECT * FROM carts WHERE id = ?", id).Find(&cart).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": cart})
}

func ListCarts(c *gin.Context) {
	
	var carts []entity.Cart
	id := c.Param("id")
	if err := entity.DB().Preload("Store").Preload("User").Raw("SELECT * FROM carts WHERE status_id = 2 and user_id = ?", id).Find(&carts).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": carts})
}

func DeleteCart(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM carts WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Cart not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

func UpdateCart(c *gin.Context) {
	var cart entity.Cart
	id := c.Param("id")

	if err := entity.DB().First(&cart, id).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Store not found!",
		})
		return
	}

	// var req struct {
	// 	Status int `json:"status"`
	// }

	// if err := c.ShouldBindJSON(&cart); err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	// if tx := entity.DB().Where("id = ?", cart.ID).First(&cart); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
	// 	return
	// }

	cart.StatusID = 3;

	if err := entity.DB().Save(&cart).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": cart})
}
