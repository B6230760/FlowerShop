export interface UsersInterface {
    ID:number,
    Email: string,
    Password: string,
    Name: string,
    Prefix: string,
    Tel: String,
    HouseNo: string,
	District: string,
	Province: string,
	PostalCode: number,
	Country: string,
    ImgPath:string,
}
export interface StatussInterface {
    ID:number,
    StatusName :string,

}
export interface StoresInterface {
    ID:number,
    NameProduct: string,
    Namestore: string,
    Price: number,
    Amount: number,
    Description: string,
    ImagePath: string ,
}
export interface CompareselctsInterface {
    ID: number,
    compareID1 : number,
    compareID2 : number,
    StoreID: number,
    Store: StoresInterface,
  }  
export interface SigninInterface {
    Email: string,
    Password: string,
}
export interface PaymentsInterface {
    ID:number,
    Method: string,

}
// 


// export export interface AddressesInterface {
//     ID:number,
//     HouseNo: string,
// 	District: string,
// 	Province: string,
// 	PostalCode: number,
// 	Country: string,
//     UserID:number,
//     User:UsersInterface,

// }
export interface CartsInterface {
    ID: number,
    Item: number,
    StoreID: number,
    Store: StoresInterface,
    StatusID:number,
    Status:StatussInterface,
    UserID:number,
    User:UsersInterface,

}
export interface BillsInterface {
    ID: string,
    Status: String,
    // AccountID: number,
    // Account: AccountsInterface,
    CartID: number,
    Cart: CartsInterface,
    PaymentID: number,
    Payment: PaymentsInterface,
    // AddressID: number,
    // Address: AddressesInterface,
    UserID:number,
    User:UsersInterface,
}
// export interface AccountsInterface {
//     ID:number,
//     Name: string,
//     Prefix: string,
//     Tel: String,
//     UserID:number,
//     User:UsersInterface,
// }
export interface Discount {
    discount: number,
}