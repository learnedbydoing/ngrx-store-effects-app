import {ActivatedRouteSnapshot, RouterStateSnapshot, Params} from "@angular/router";
import {ActionReducerMap, createFeatureSelector} from "@ngrx/store";

import * as fromRouter from '@ngrx/router-store';


export interface RouterStateUrl {
  url: string;
  queryParams: Params; //query parameters in the url
  params: Params; // e.g. parameter '/1' in the URL
}

export interface State { //state for our application
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl> //generic <RouterStateUrl> means, that we will comform to the interface above
}

export const reducers: ActionReducerMap<State> = {
  routerReducer: fromRouter.routerReducer,
}

export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('routerReducer');

//TODO: all this must be studied again to fully understand
export class CustomSerializer implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const {url} = routerState; //ES6 destructuring
    const {queryParams} = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild
    }
    const params = state.params;


    return {url, queryParams, params};
  }
}
