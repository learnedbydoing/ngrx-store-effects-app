import {ActionReducerMap, createFeatureSelector, createSelector} from "@ngrx/store"; //for typechecking of reducer

import * as fromPizzas from './pizzas.reducer';
import {PizzaState} from "./pizzas.reducer";


export interface ProductsState {
  pizzas: fromPizzas.PizzaState;
}

export const reducers: ActionReducerMap<ProductsState> = { //ProductsState is gonna be generic type
  pizzas: fromPizzas.reducer
};

//products state
export const getProductsState = createFeatureSelector<ProductsState>('products');
//const which holds a selector for our entire lazy loaded module
// here we are creating a base reference to the 'products' property on our state (we have StoreModule with feature object property 'products'
// so anything in this module is relied on and underneath a feature called products


//pizzas state
export const getPizzaState = createSelector(getProductsState, (state: ProductsState) => state.pizzas);
// explained: Give me the products -> ok, now give me the pizzas


export const getPizzasEntities = createSelector(getPizzaState, fromPizzas.getPizzasEntities);

export const getAllPizzas = createSelector(
  getPizzasEntities,
  (entities) => {
    return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
  });

export const getPizzasLoaded = createSelector(getPizzaState, fromPizzas.getPizzasLoaded);
export const getPizzasLoading = createSelector(getPizzaState, fromPizzas.getPizzasLoading);
