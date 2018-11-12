//load all our actions
import * as fromPizzas from "../actions/pizza.action";

import {Pizza} from "../../models/pizza.model";
import {PizzaAction} from "../actions/pizza.action";

export interface PizzaState {
  //defining a slice of state that reducer will manage in the entire state tree
  data: Pizza[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: PizzaState = {
  data: [],
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromPizzas.PizzaAction //action type defined in the bottom of actions
): PizzaState {
  //return type of reducer is "something that conform with `PizzaState` (but we wil just change those values)

  switch (action.type) {

    case fromPizzas.LOAD_PIZZAS: {
      return {
        ...state,
        loading: true
      }
    }

    case fromPizzas.LOAD_PIZZAS_SUCCESS: {
      const data = action.payload; //get data provided
      return {
        ...state,
        loading: false,
        loaded: true,
        data //merge with current state
      }
    }

    case fromPizzas.LOAD_PIZZAS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      }
    }
  }

  return state; // return `state` on first loading of all app when there is no action
}

export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
export const getPizzas = (state: PizzaState) => state.data;
//..these are small functions that get passed a small level of the PizzaState and at that point in time we are down in our data structures
// => good practice to put such functions under our reducer
