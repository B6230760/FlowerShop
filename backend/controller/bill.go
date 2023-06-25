package controller

import (
	"github.com/B6230760/FlowerShop/entity"
	"github.com/gin-gonic/gin"
	"net/http"
)

func CreateBill(c *gin.Context) {
	var Bill entity.Bill
	// var Adddress entity.Address
	// var Account entity.Account
	var Cart entity.Cart
	var User entity.User
	var Payment entity.Payment


	if err := c.ShouldBindJSON(&Bill); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	if tx := entity.DB().Where("id = ?", Bill.CartID).First(&Cart); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Cart not found"})
		return
	}
	//ค้นหา Payment
	if tx := entity.DB().Where("id = ?", Bill.PaymentID).First(&Payment); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Payment not found"})
		return 
	}
	// //ค้นหา Account
	// if tx := entity.DB().Where("id = ?", Bill.AccountID).First(&Account); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "User not found"})
	// 	return 
	// } 
  	// //ค้นหา Address
	// if tx := entity.DB().Where("id = ?", Bill.AddressID).First(&Adddress); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "Address not found"})
	// 	return 
	// }
	
	if tx := entity.DB().Where("id = ?", Bill.UserID).First(&User); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found"})
		return
	}


	// สร้าง Bill
	ac := entity.Bill{
		// Account:   Account,  
		// Address:  Adddress, 
		Cart:   Cart,  	
		Payment:   Payment,  
		User:User,
	
	}
	// บันทึก
	if err := entity.DB().Create(&ac).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	
	c.JSON(http.StatusOK, gin.H{"data": ac})
}

func GetBill(c *gin.Context) {
	var Bill entity.Bill
	id := c.Param("id")
	if err := entity.DB().Preload("Cart.Store").Preload("Payment").Preload("User").Raw("SELECT * FROM bills WHERE user_id id = ?", id).Find(&Bill).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Bill})
}

func ListBills(c *gin.Context) {
	var Bills []entity.Bill
	id := c.Param("id")
	if err := entity.DB().Preload("Cart.Store").Preload("User").Preload("Payment").Preload("User").Raw("SELECT * FROM bills WHERE user_id  = ?", id).Find(&Bills).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// if err := entity.DB().Preload("Cart.Store ").Preload("Payment").Preload("Address").Preload("Account").Find(&Bills).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	c.JSON(http.StatusOK, gin.H{"data": Bills})
}


func DeleteBill(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM bills WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "bill not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}


func UpdateBill(c *gin.Context) {
	var Bill entity.Bill
	if err := c.ShouldBindJSON(&Bill); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", Bill.ID).First(&Bill); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "bill not found"})
		return
	}

	if err := entity.DB().Save(&Bill).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Bill})
}
