export class ItemModel{
    productId: string="";
    amount: number=0;
    totalPrice: number=0;
    CartID: string=JSON.parse(localStorage.myCart)._id||"";
}