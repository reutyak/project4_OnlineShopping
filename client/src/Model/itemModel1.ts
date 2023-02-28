export class ItemModel1{
    productId: string="";
    amount: number=0;
    CartID: string=JSON.parse(localStorage.myCart)._id||"";
    price:number=0;
    totalPrice: number=this.amount*this.price;
}