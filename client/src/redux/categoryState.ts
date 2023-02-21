import { categoryModel } from "../Model/categoryModel";

export class categoryState {
  public categoriesST: categoryModel[] = [];
}

export enum categoriesActionType {
  getAllCategoriesST = "getAllCategoriesST",
  deleteCategoryST = "deleteCategoryST",
  addCategoryST = "addCategoryST",
  updateCategoryST = "updateCategoryST",
  logOut = "logOut",
}

export interface categoryAction {
  type: categoriesActionType;
  payload?: any;
}

export function logOut(): categoryAction {
  return { type: categoriesActionType.logOut };
}

//function to handle the state changes (dispatch)
export function getAllCategoriesST(myCategories: categoryModel[]): categoryAction {
  return { type: categoriesActionType.getAllCategoriesST, payload: myCategories };
}

//delete product
export function deleteCategoryST(_id: string): categoryAction {
  return { type: categoriesActionType.deleteCategoryST, payload: _id };
}

//add vacation
export function addCategoryST(myCategory: any): categoryAction {
  return { type: categoriesActionType.addCategoryST, payload: myCategory };
}

//update vacation
export function updateCategoryST(_id:string, myCategory: any): categoryAction {
  return { type: categoriesActionType.updateCategoryST, payload: {_id, myCategory} };
}

export function categoryReducer(
  currentState: categoryState = new categoryState(),
  action: categoryAction
): categoryState {
  // const newState = {...currentState};
  const newState = JSON.parse(JSON.stringify(currentState));

  switch (action.type) {
    case categoriesActionType.logOut:
      newState.categoriesST = [];
      break;
    case categoriesActionType.getAllCategoriesST:
      console.log(action);
      newState.categoriesST = action.payload;
      console.log(newState);
      break;

    case categoriesActionType.addCategoryST:
      console.log(newState);
      console.log(action.payload);
      newState.categoriesST.push(action.payload);
      console.log(newState);
      break;

    case categoriesActionType.updateCategoryST:
      newState.categoriesST = newState.categoriesST
        .filter((item: { _id: string }) => item._id !== action.payload._id)
        .push(action.payload.myCategory);
      break;

    case categoriesActionType.deleteCategoryST:
      console.log(newState);
      console.log(action.payload);
      newState.categoriesST = newState.categoriesST.filter(
        (item: { _id: string }) => item._id !== action.payload
      );
      console.log(newState);

      break;
  }

  return newState;
}
