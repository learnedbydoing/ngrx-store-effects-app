import {ActionReducerMap} from "@ngrx/store"; //for typechecking of reducer

import * as fromPizzas from './pizzas.reducer';


export interface ProductsState {
  pizzas: fromPizzas.PizzaState;
}

export const reducers: ActionReducerMap<ProductsState> = { //ProductsState is gonna be generic type
  pizzas: fromPizzas.reducer
};
