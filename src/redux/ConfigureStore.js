import { createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";
// import logger from "redux-logger";
import {Drivers} from './drivers';
import { Constructors } from "./constructors";
import { DriversStandings } from "./driversStandings";


export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      drivers: Drivers,
      constructors: Constructors,
      driversStandings: DriversStandings
    }),
    applyMiddleware(thunk)
  );

  return store;
}