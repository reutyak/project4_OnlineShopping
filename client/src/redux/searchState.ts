export class SearchState {
  public SearchST: string = "";
}

export enum searchActionType {
  getSearchST = "getSearchST",
  deleteSearchST = "deleteSearchST",
  //   addItemsST = "addItemsST",
  //   updateItemsST = "updateItemsST",
  logOut = "logOut",
}

export interface SearchAction {
  type: searchActionType;
  payload?: any;
}

export function logOut(): SearchAction {
  return { type: searchActionType.logOut };
}

//function to handle the state changes (dispatch)
export function getSearchST(mySearch: string): SearchAction {
  return { type: searchActionType.getSearchST, payload: mySearch };
}

//delete product
export function deleteSearchST(): SearchAction {
  return { type: searchActionType.deleteSearchST };
}

//add vacation
// export function addItemsST(myProduct: any): ItemsAction {
//   return { type: searchActionType.addItemsST, payload: myProduct };
// }

//update vacation
// export function updateItemsST(myProduct: any): ItemsAction {
//   return { type: searchActionType.updateItemsST, payload: myProduct };
// }

export function searchReducer(
  currentState: SearchState = new SearchState(),
  action: SearchAction
): SearchState {
  // const newState = {...currentState};
  const newState = JSON.parse(JSON.stringify(currentState));

  switch (action.type) {
    case searchActionType.logOut:
      newState.SearchST = "";
      break;
    case searchActionType.getSearchST:
      console.log(action);
      newState.SearchST = action.payload;
      console.log(newState);
      break;

    // case searchActionType.addItemsST:
    //   console.log(newState);
    //   console.log(action.payload);
    //   newState.ItemsST.push(action.payload);
    //   console.log(newState);
    //   break;

    // case searchActionType.updateItemsST:
    //   newState.ItemsST = newState.ItemsST.filter((item: { productId: any; } ) => item.productId !== action.payload.productId).push(action.payload);
    //   console.log(newState);
    //   break;

    case searchActionType.deleteSearchST:
      newState.SearchST = "";
      console.log(newState);

      break;
  }

  return newState;
}
