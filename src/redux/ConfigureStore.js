import { createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";
// import logger from "redux-logger";
import {Drivers} from './drivers';
import { Constructors } from "./constructors";


export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      drivers: Drivers,
      constructors: Constructors
    }),
    applyMiddleware(thunk)
  );

  return store;
}