import { SearchState, searchReducer } from './searchState';
import { ItemsState, itemsReducer } from './itemsState';
import { combineReducers} from "redux";
import { configureStore} from "@reduxjs/toolkit"
import { productsReducer } from "./productState";
import { categoryReducer } from "./categoryState";
import { usersReducer } from "./userState";


//Union of all the reducers
const reducers = combineReducers({productState : productsReducer,categoryState:categoryReducer,UserState:usersReducer,ItemsState:itemsReducer,SearchState:searchReducer});
//retention and externalization all the reducers in store variable.
export const store = configureStore({reducer : reducers});

//export const store = createStore(vacationReducer);