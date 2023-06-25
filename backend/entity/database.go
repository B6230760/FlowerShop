package entity

import (
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}
func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("pre.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	// Migrate the schema
	database.AutoMigrate(
		&User{},
		&Cart{},    //ระบบ
		// &Account{}, //ระบบ
		// &Address{},
		&Store{},
		&Payment{},
		&Bill{}, //ระบบ
		&Compare{},
		&Status{},
	)
	db = database
	password, err := bcrypt.GenerateFromPassword([]byte("123456"), 14)
	//    =================================== User ==========================================================
	user := User{

		Email:      "patnarin@gmail.com",
		Password:   string(password),
		Name:   "ภัทนรินทร์ เอี่ยวเฉย",
		ImgPath: "https://ไอเดียทรงผม.com/images/2023/04/04/xn--72czjvzci0ftdsfvb.com_8bfd48366df3943eee88d85a5a4914ea.jpeg",
		Prefix: "หญิง",
		Tel:    "0882743026",
		HouseNo:    "244",
		District:   "เมือง",
		Province:   "นครราชสีมา",
		PostalCode: 30000,
		Country:    "ไทย",
	}
	db.Model(&User{}).Create(&user)

	user2 := User{

		Email:    "pat@gmail.com",
		Password: string(password),
		Name:   "นาย A",
		ImgPath: "https://ไอเดียทรงผม.com/images/2023/04/04/xn--72czjvzci0ftdsfvb.com_625ac7c51048a1b90470a31931edab31.jpeg",
		Prefix: "Male",
		Tel:    "0123456754",
		HouseNo:    "244",
		District:   "เมือง",
		Province:   "นครราชสีมา",
		PostalCode: 30000,
		Country:    "ไทย",
	}
	db.Model(&User{}).Create(&user2)
	//    =================================== User ==========================================================
	//    ===================================================================================================
	//    =================================== Address ==========================================================
	// address1 := Address{
	// 	HouseNo:    "244",
	// 	District:   "เมือง",
	// 	Province:   "นครราชสีมา",
	// 	PostalCode: 30000,
	// 	Country:    "ไทย",
	// }

	// db.Model(&Address{}).Create(&address1)
	// address2 := Address{
	// 	HouseNo:    "244",
	// 	District:   "เมือง",
	// 	Province:   "นครราชสีมา",
	// 	PostalCode: 30000,
	// 	Country:    "ไทย",
	// }
	// db.Model(&Address{}).Create(&address2)

	//    =================================== User ==========================================================
	//    ===================================================================================================
	//    =================================== Address ==========================================================
	// account1 := Account{
	// 	Name:   "ภัทนรินทร์ เอี่ยวเฉย",
	// 	Prefix: "หญิง",
	// 	Tel:    "0882743026",
	// }
	// db.Model(&Account{}).Create(&account1)

	// account2 := Account{
	// 	Name:   "นาย A",
	// 	Prefix: "Male",
	// 	Tel:    "0123456754",
	// }
	// db.Model(&Account{}).Create(&account2)
	//    =================================== User ==========================================================
	//    ===================================================================================================
	//    =================================== Status ==========================================================
	status1 := Status{
		StatusCart: "ชำระเงินแล้ว",
		// Status_ID: 1 ,
	}
	db.Model(&Status{}).Create(&status1)
	status2 := Status{
		StatusCart: "ยังไม่ได้ชำระเงิน",
		// Status_ID: 2 ,
	}
	db.Model(&Status{}).Create(&status2)
	status3 := Status{
		StatusCart: "รอชำระเงิน",
		// Status_ID: 3 ,
	}
	db.Model(&Status{}).Create(&status3)
	//    =================================== Status ==========================================================
	//    ===================================================================================================
	//    =================================== Stroe ==========================================================

	//    =================================== FlowerA ==========================================================
	store1 := Store{

		NameProduct: "ดอกทิวลิปสีชมพู",
		Namestore:   "FlowerA",
		Price:       45,
		Amount:      5,
		Description: "สายพันธุ์ : Aaske (สีชมพู)",
		ImagePath:   "https://i.pinimg.com/564x/54/41/30/54413025183bb69959df06f478d7f533.jpg",
	}
	db.Model(&Store{}).Create(&store1)

	store4 := Store{

		NameProduct: "ดอกเดซี่สีขาว",
		Namestore:   "FlowerA",
		Price:       35,
		Amount:      6,
		Description: "สายพันธุ์ : เดซี่อังกฤษ (English Daisy) ",
		ImagePath:   "https://cl.lnwfile.com/_/cl/_raw/xa/h9/om.jpg",
	}
	db.Model(&Store{}).Create(&store4)

	store5 := Store{

		NameProduct: "ดอกมะลิ",
		Namestore:   "FlowerA",
		Price:       35,
		Amount:      6,
		Description: "สายพันธุ์ : มะลิลาหรือมะลิซ้อน",
		ImagePath:   "https://static.cdntap.com/tap-assets-prod/wp-content/uploads/sites/25/2021/04/Arabian-Jasmine1.jpg",
	}
	db.Model(&Store{}).Create(&store5)
	//    =================================== FlowerA ==========================================================
	//    =================================== ShopB  ===========================================================

	store2 := Store{

		NameProduct: "ดอกกุหลาบ",
		Namestore:   "ShopB",
		Price:       35,
		Amount:      6,
		Description: "สายพันธุ์ :",
		ImagePath:   "https://i.pinimg.com/564x/97/31/d3/9731d3a12ca0cb35dc7b8066cd66de7a.jpg",
	}
	db.Model(&Store{}).Create(&store2)

	store6 := Store{

		NameProduct: "ดอกมะลิ",
		Namestore:   "ShopB",
		Price:       35,
		Amount:      6,
		Description: "สายพันธุ์ : มะลิลาหรือมะลิซ้อน",
		ImagePath:   "https://static.cdntap.com/tap-assets-prod/wp-content/uploads/sites/25/2021/04/Arabian-Jasmine1.jpg",
	}
	db.Model(&Store{}).Create(&store6)

	store7 := Store{

		NameProduct: "ดอกเดซี่สีขาว",
		Namestore:   "ShopB",
		Price:       35,
		Amount:      6,
		Description: "สายพันธุ์ : เดซี่อังกฤษ (English Daisy) ",
		ImagePath:   "https://cl.lnwfile.com/_/cl/_raw/xa/h9/om.jpg",
	}
	db.Model(&Store{}).Create(&store7)
	//    =================================== ShopB  ===========================================================
	//    =================================== CFlower  ===========================================================

	store3 := Store{

		NameProduct: "ดอกมะลิ",
		Namestore:   "CFlower",
		Price:       35,
		Amount:      6,
		Description: "สายพันธุ์ : มะลิลาหรือมะลิซ้อน",
		ImagePath:   "https://static.cdntap.com/tap-assets-prod/wp-content/uploads/sites/25/2021/04/Arabian-Jasmine1.jpg",
	}
	db.Model(&Store{}).Create(&store3)

	store10 := Store{

		NameProduct: "ดอกไฮเดรนเยียสีน้ำเงิน",
		Namestore:   "CFlower",
		Price:       35,
		Amount:      6,
		Description: "สายพันธุ์ : Anda Blue",
		ImagePath:   "https://www.allaboutgardening.com/wp-content/uploads/2022/03/Blue-Hydrangea-Varieties.jpg",
	}
	db.Model(&Store{}).Create(&store10)

	//    =================================== ShopB  ===========================================================
	//    =================================== ShopB  ===========================================================

	store8 := Store{

		NameProduct: "ดอกเดซี่สีขาว",
		Namestore:   "FlowerIsBeauty",
		Price:       35,
		Amount:      6,
		Description: "สายพันธุ์ : เดซี่อังกฤษ (English Daisy) ",
		ImagePath:   "https://cl.lnwfile.com/_/cl/_raw/xa/h9/om.jpg",
	}
	db.Model(&Store{}).Create(&store8)

	store9 := Store{

		NameProduct: "ดอกกุหลาบเพเทียนซ์",
		Namestore:   "FlowerIsBeauty",
		Price:       35,
		Amount:      6,
		Description: "สายพันธุ์ : Patience Rose",
		ImagePath:   "https://www.pearlfloristhouse.com/wp-content/uploads/2021/10/IMG_0069-295x300.jpg",
	}
	db.Model(&Store{}).Create(&store9)
	//    =================================== ShopB  ===========================================================
	//    =================================== ShopB  ===========================================================

	//    =================================== Store ============================================================
	//    ======================================================================================================
	//    =================================== Payment ==========================================================
	payment1 := Payment{

		Method: "ธนาคาร",
	}
	db.Model(&Payment{}).Create(&payment1)

	payment2 := Payment{

		Method: "เงินสด",
	}
	db.Model(&Payment{}).Create(&payment2)

	//    =================================== Payment ==========================================================

}
