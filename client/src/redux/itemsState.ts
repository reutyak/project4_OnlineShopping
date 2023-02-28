import { ItemModel } from '../Model/itemModel';

export class ItemsState {
  public ItemsST: ItemModel[] = [];
}

export enum itemsActionType {
  getAllItemsST = "getAllItemsST",
  deleteItemsST = "deleteItemsST",
  addItemsST = "addItemsST",
  updateItemsST = "updateItemsST",
  logOut = "logOut",
}

export interface ItemsAction {
  type: itemsActionType;
  payload?: any;
}

export function logOut(): ItemsAction {
  return { type: itemsActionType.logOut };
}

//function to handle the state changes (dispatch)
export function getAllItemsST(myProducts: any[]): ItemsAction {
  return { type: itemsActionType.getAllItemsST, payload: myProducts };
}



//delete product
export function deleteItemsST(productId: string): ItemsAction {
  return { type: itemsActionType.deleteItemsST, payload:productId };
}

//add vacation
export function addItemsST(myProduct: any): ItemsAction {
  return { type: itemsActionType.addItemsST, payload: myProduct };
}

//update vacation
export function updateItemsST(myProduct: any): ItemsAction {
  return { type: itemsActionType.updateItemsST, payload: myProduct };
}

export function itemsReducer(
  currentState: ItemsState = new ItemsState(),
  action: ItemsAction
): ItemsState {
  // const newState = {...currentState};
  const newState = JSON.parse(JSON.stringify(currentState));

  switch (action.type) {
    case itemsActionType.logOut:
      newState.ItemsST = [];
      break;
    case itemsActionType.getAllItemsST:
      console.log(action);
      newState.ItemsST = action.payload;
      console.log(newState);
      break;

    case itemsActionType.addItemsST:
      console.log(newState);
      console.log(action.payload);
      newState.ItemsST.push(action.payload);
      console.log(newState);
      break;

    case itemsActionType.updateItemsST:
      newState.ItemsST = newState.ItemsST.filter((item: { productId: any; } ) => item.productId !== action.payload.productId).push(action.payload);
      console.log(newState);
      break;

    case itemsActionType.deleteItemsST:
      console.log(newState);
      console.log(action.payload);
      newState.ItemsST = newState.ItemsST.filter(
        (item: { productId: any; }) => item.productId !== action.payload
      );
      console.log(newState);

      break;
  }

  return newState;
}
