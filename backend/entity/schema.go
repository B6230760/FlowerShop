package entity

import (
	"gorm.io/gorm"
	
)

type User struct {
	gorm.Model
	Email  string `gorm:"uniqueIndex"`
	Name string
	ImgPath string
	Prefix string
	Tel string 
	Password string
	HouseNo string
	District string
	Province string
	PostalCode int
	Country string
	Cart []Cart `gorm:"foreignKey:UserID"`

	// Account []Account `gorm:"foreignKey:UserID"`
	Bill []Bill `gorm:"foreignKey:UserID"`
	// Adddress []Address `gorm:"foreignKey:UserID"`

}
// type Address struct{
// 	gorm.Model
// 	HouseNo string
// 	District string
// 	Province string
// 	PostalCode int
// 	Country string
// 	UserID *uint
// 	User   User `gorm:"references:id"`

// 	Account []Account `gorm:"foreignKey:AddressID"`
// 	Bill []Bill `gorm:"foreignKey:AddressID"`
// }


type Payment struct{
	gorm.Model
	Method string
	
	Bill []Bill `gorm:"foreignKey:PaymentID"`
}
type Store struct{
	gorm.Model

	NameProduct string
	Namestore string
	Price int
	Amount int
	Description string
	ImagePath    string 
	Compare []Compare `gorm:"foreignKey:StoreID"`
	Cart []Cart `gorm:"foreignKey:StoreID"`
}
type Status struct {
	gorm.Model
	StatusCart string
	Cart []Cart `gorm:"foreignKey:StatusID"`
}
//ระบบข้อมูลลูกค้า
// type Account struct{
// 	gorm.Model
// 	Name string
// 	Prefix string
// 	Tel string 
// 	AddressID *uint
// 	Address   Address `gorm:"references:id"`

// 	UserID *uint
// 	User   User `gorm:"references:id"`

// 	Bill []Bill `gorm:"foreignKey:AccountID"`
// }
//ระบบเลือกสินค้า

type Cart struct {
	gorm.Model
	
	Item int
	StatusID int
	Status   Status `gorm:"references:id"`
	StoreID *uint
	Store Store `gorm:"references:id"`
	Bill []Bill `gorm:"foreignKey:CartID"`
	UserID *uint
	User User `gorm:"references:id"`
	
}

//ระบบบิล

type Bill struct {
	gorm.Model
	//PriceTotal int

	// AccountID *uint
	// Account Account `gorm:"references:id"`

	CartID *uint
	Cart Cart `gorm:"references:id"`
	
	// StoreID *uint
	// Store Store `gorm:"references:id"`

	PaymentID *uint
	Payment Payment `gorm:"references:id"`
	
	// AddressID *uint
	// Address Address `gorm:"references:id"`
	
	UserID *uint
	User User `gorm:"references:id"`

}
type Compare struct {
	gorm.Model
	StoreID *uint
	Store   Store `gorm:"references:id"`
	CompareID1 int
	CompareID2 int
}

// type Discount struct {
// 	gorm.Model
// 	Discount int
// }