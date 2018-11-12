import {map, switchMap, catchError} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {Effect, Actions} from "@ngrx/effects"; // Actions is observable, we can then listen to action types
import {of} from "rxjs/observable/of";

import * as pizzaActions from '../actions/pizza.action';
import * as fromServices from '../../services';

@Injectable()
export class PizzasEffect {
  constructor(private actions$: Actions,
              private pizzaService: fromServices.PizzasService) {
  }

  @Effect()
  loadPizzas$ = this.actions$
    .ofType(pizzaActions.LOAD_PIZZAS)
    .pipe(
      switchMap(() => {
        return this.pizzaService.getPizzas().pipe(
          map(pizzas => new pizzaActions.LoadPizzasSuccess(pizzas)),
          catchError(error => of(new pizzaActions.LoadPizzasFail(error)))  //using of() operator to return the result as observable
        );
      })
    );
}

/* effect is a class with a few properties, that are observables
    same as reducer it enables us to respond to different events and do different things
*/
