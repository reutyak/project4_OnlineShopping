import { productModel } from './../Model/productModel';

export class ProductState {
  public productsST: productModel[] = [];
}

export enum productsActionType {
  getAllProductsST = "getAllProductsST",
  deleteProductsST = "deleteProductsST",
  addProductsST = "addProductsST",
  updateProductsST = "updateProductsST",
  logOut = "logOut",
}

export interface ProductsAction {
  type: productsActionType;
  payload?: any;
}

export function logOut(): ProductsAction {
  return { type: productsActionType.logOut };
}

//function to handle the state changes (dispatch)
export function getAllProductsST(myProducts: productModel[]): ProductsAction {
  return { type: productsActionType.getAllProductsST, payload: myProducts };
}

//delete product
export function deleteProductsST(_id: string): ProductsAction {
  return { type: productsActionType.deleteProductsST, payload: _id };
}

//add vacation
export function addProductsST(myProduct: productModel): ProductsAction {
  return { type: productsActionType.addProductsST, payload: myProduct };
}

//update vacation
export function updateProductsST(myProduct: productModel): ProductsAction {
  return { type: productsActionType.updateProductsST, payload: myProduct };
}

export function productsReducer(
  currentState: ProductState = new ProductState(),
  action: ProductsAction
): ProductState {
  // const newState = {...currentState};
  const newState = JSON.parse(JSON.stringify(currentState));

  switch (action.type) {
    case productsActionType.logOut:
      newState.productsST = [];
      break;
    case productsActionType.getAllProductsST:
      console.log(action);
      newState.productsST = action.payload;
      console.log(newState);
      break;

    case productsActionType.addProductsST:
      console.log(newState);
      console.log(action.payload);
      newState.productsST.push(action.payload);
      console.log(newState);
      break;

    case productsActionType.updateProductsST:
      newState.productsST = newState.productsST
        .filter((item: { _id: string }) => item._id !== action.payload)
        .push(action.payload);
      break;

    case productsActionType.deleteProductsST:
      console.log(newState);
      console.log(action.payload);
      newState.productsST = newState.productsST.filter(
        (item: { _id: string }) => item._id !== action.payload
      );
      console.log(newState);

      break;
  }

  return newState;
}
