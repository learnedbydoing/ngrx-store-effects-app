import { Action } from '@ngrx/store'; //interface only with `type` mandatory

import { Pizza } from '../../models/pizza.model';

// aciton constants
// we are communicating here via event and these event describe what is going in our app
// so we can respond accordingly
export const LOAD_PIZZAS = '[Products] Load Pizzas';
export const LOAD_PIZZAS_FAIL = '[Products] Load Pizzas Fail'; //result of LOAD_PIZZAS
export const LOAD_PIZZAS_SUCCESS = '[Products] Load Pizzas Success'; //result of LOAD_PIZZAS

//action creators
export class LoadPizzas implements Action {
  readonly type = LOAD_PIZZAS; //type is required by `Action` interface (imported)
}

export class LoadPizzasFail implements Action {
  readonly type = LOAD_PIZZAS_FAIL;
  constructor(public payload: any) {}  //public because in case of error we can send the message from this payload property back from the server
}

export class LoadPizzasSuccess implements Action {
  readonly type = LOAD_PIZZAS_SUCCESS;
  constructor(public payload: Pizza[]) {}
}


//action types
export type PizzaAction = LoadPizzas | LoadPizzasFail | LoadPizzasSuccess;


