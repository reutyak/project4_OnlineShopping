import { combineReducers} from "redux";
import { configureStore} from "@reduxjs/toolkit"
import { productsReducer } from "./productState";


//Union of all the reducers
const reducers = combineReducers({productState : productsReducer});
//retention and externalization all the reducers in store variable.
export const store = configureStore({reducer : reducers});

//export const store = createStore(vacationReducer);