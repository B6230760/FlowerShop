package main

import (
	"github.com/B6230760/FlowerShop/controller"
	"github.com/B6230760/FlowerShop/entity"
	"github.com/B6230760/FlowerShop/middlewares"
	"github.com/gin-gonic/gin"
	
)

func main() {
	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())
	api := r.Group("")
	{
		protected := api.Use(middlewares.Authorizes())

		{
			// User Routes
			protected.GET("/users/:id", controller.ListUsers)
			protected.GET("/user/:id", controller.GetUser)
			protected.POST("/users", controller.CreateUser)
			protected.PATCH("/users", controller.UpdateUser)
			protected.DELETE("/users/:id", controller.DeleteUser)
			// Run the server

			// Product Routes
			protected.GET("/carts/:id", controller.ListCarts)
			protected.GET("/cart/:id", controller.GetCart)
			protected.POST("/carts", controller.CreateCart)
			protected.PATCH("/carts/:id", controller.UpdateCart)
			protected.DELETE("/carts/:id", controller.DeleteCart)
			// Run the server

			// ProductStock Routes
			protected.GET("/stores", controller.ListStores)
			protected.GET("/store/:id", controller.GetStore)
			protected.POST("/stores", controller.CreateStore)
			protected.PATCH("/stores/:id", controller.UpdateStore)
			protected.DELETE("/stores/:id", controller.DeleteStore)
			// Run the server

			// // Account Routes
			// protected.GET("/accounts/:id", controller.ListAccounts)
			// protected.GET("/account/:id", controller.GetAccount)
			// protected.POST("/accounts", controller.CreateAccount)
			// protected.PATCH("/accounts", controller.UpdateAccount)
			// protected.DELETE("/accounts/:id", controller.DeleteAccount)
			// // Run the server

			// Address Routes
			// protected.GET("/addresss/:id", controller.ListAddresss)
			// protected.GET("/adderss/:id", controller.GetAddress)
			// protected.POST("/addresss", controller.CreateAddress)
			// protected.PATCH("/addresss", controller.UpdateAddress)
			// protected.DELETE("/addresss/:id", controller.DeleteAddress)
			// // Run the server

			protected.GET("/bills/:id", controller.ListBills)
			protected.GET("/bill/:id", controller.GetBill)
			protected.POST("/bills", controller.CreateBill)
			protected.PATCH("/bills", controller.UpdateBill)
			protected.DELETE("/bills/:id", controller.DeleteBill)
			// Run the server

			protected.GET("/statuss", controller.ListStatuss)
			protected.GET("/status/:id", controller.GetStatus)
			protected.POST("/statuss", controller.CreateStatus)
			protected.PATCH("/statuss", controller.UpdateStatust)
			protected.DELETE("/statuss/:id", controller.DeleteStatus)
			// Run the server

			protected.GET("/payments", controller.ListPayments)
			protected.GET("/payment/:id", controller.GetPayment)
			protected.POST("/payments", controller.CreatePayment)
			protected.PATCH("/payments", controller.UpdatePayment)
			protected.DELETE("/payments/:id", controller.DeletePayment)
			// Run the server

			// ProductStock Routes
			protected.GET("/compares", controller.ListCompares)
			protected.GET("/compare/:id", controller.GetCompare)
			protected.POST("/compares", controller.CreateCompare)
			protected.PATCH("/compares", controller.UpdateCompare)
			protected.DELETE("/compares/:id", controller.DeleteCompare)
			// Run the server

		}
	}
	r.POST("/user/login", controller.Login)
	// Authentication Routes

	// Run the server
	r.Run()
}

func CORSMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {

		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT,PATCH,DELETE")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}

}
