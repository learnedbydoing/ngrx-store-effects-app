//load all our actions
import * as fromPizzas from "../actions/pizza.action";

import {Pizza} from "../../models/pizza.model";
import {PizzaAction} from "../actions/pizza.action";

export interface PizzaState { //defining a slice of state that reducer will manage in the entire state tree
  /*  data: Pizza[]; //does not scale, it is better to work with object (aka entities), similar to backend
  *   think of NgRx store as a kind of database for the client
  * */
  entities: { [id: number]: Pizza } //object with entities, each entity identified by ID + will hold a pizza
  loaded: boolean;
  loading: boolean;
}

/*
*   from action.payload we get this structure [{ id: 1}, { id:2 }] (=array of objects)
*   we need to convert this structure into entities
*   example entities object:
*
    const pizza[any] = {
      1: {
        id: 1,
        name: 'pizza salami',
        toppings: []
      },
      2: {}
    }

* */



export const initialState: PizzaState = {
  entities: {},
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
      const pizzas = action.payload; //get data provided

      const entities = pizzas.reduce(
        (entities: { [id: number]: Pizza }, pizza: Pizza) => {
          return {
            ...entities,
            [pizza.id]: pizza
          }
        }, {
          ...state.entities //initial value for reducer function
        })

      return {
        ...state,
        loading: false,
        loaded: true,
        entities
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
export const getPizzasEntities = (state: PizzaState) => state.entities;
//..these are small functions that get passed a small level of the PizzaState and at that point in time we are down in our data structures
// => good practice to put such functions under our reducer
