import { UserModel } from "../Model/userModel";

export class UserState {
  public usersST: UserModel[] = [];
}

export enum usersActionType {
  getAllUsersST = "getAllUsersST",
//   deleteProductsST = "deleteProductsST",
  addUserST = "addUserST",
//   updateProductsST = "updateProductsST",
  logOut = "logOut",
}

export interface UsersAction {
  type: usersActionType;
  payload?: any;
}

export function logOut(): UsersAction {
  return { type: usersActionType.logOut };
}

//function to handle the state changes (dispatch)
export function getAllUsersST(myUsers: any[]): UsersAction {
  return { type: usersActionType.getAllUsersST, payload: myUsers };
}

//delete product
// export function deleteProductsST(_id: string): ProductsAction {
//   return { type: productsActionType.deleteProductsST, payload: _id };
// }

//add user
export function addUsersST(user: any): UsersAction {
  return { type: usersActionType.addUserST, payload: user };
}

//getSingleUser


//update vacation
// export function updateProductsST(myProduct: any): ProductsAction {
//   return { type: productsActionType.updateProductsST, payload: myProduct };
// }

export function usersReducer(
  currentState: UserState = new UserState(),
  action: UsersAction
): UserState {
  // const newState = {...currentState};
  const newState = JSON.parse(JSON.stringify(currentState));

  switch (action.type) {
    case usersActionType.logOut:
      newState.usersST = [];
      break;
    case usersActionType.getAllUsersST:
      console.log(action);
      newState.usersST = action.payload;
      console.log(newState);
      break;

    case usersActionType.addUserST:
      console.log(newState);
      console.log(action.payload);
      newState.usersST.push(action.payload);
      console.log(newState);
      break;

    // case productsActionType.updateProductsST:
    //   newState.productsST = newState.productsST
    //     .filter((item: { _id: string }) => item._id !== action.payload)
    //     .push(action.payload);
    //   break;

    // case productsActionType.deleteProductsST:
    //   console.log(newState);
    //   console.log(action.payload);
    //   newState.productsST = newState.productsST.filter(
    //     (item: { _id: string }) => item._id !== action.payload
    //   );
    //   console.log(newState);

    //   break;
  }

  return newState;
}
