import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as actions from '../actions/item';
import { Item, List, Entity } from '../../models';
import { DataService } from '../../services/data.service';

@Injectable()
export class ItemEffects {

  @Effect()
  loadItems$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.Load),
    switchMap(() =>
      this.dataService.find(Entity.Item)
        .pipe(
          map((items: Item[]) => new actions.LoadSuccess(items)),
          // catchError((error: Error) => of(new actions.ErrorHandle({ error })))
        ))
  );

  @Effect()
  addItem$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.Add),
    map((action: actions.Add) => action.payload),
    switchMap((item: Item) =>
      this.dataService.insert(Entity.Item, item).pipe(
        map((id: string | number) => new actions.AddSuccess({ ...item, id })),
        // catchError((error: Error) => of(new actions.ErrorHandle({ error })))
      )
    )
  );

  @Effect()
  updateItem$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.Update),
    map((action: actions.Update) => action.payload),
    switchMap((item: Item) =>
      this.dataService.update(Entity.Item, item).pipe(
        map(() => new actions.UpdateSuccess(item)),
        // catchError((error: Error) => of(new actions.ErrorHandle({ error })))
      )
    )
  );

  @Effect()
  removeItem$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.Remove),
    map((action: actions.Remove) => action.payload),
    switchMap((id: string | number) =>
      this.dataService.remove(Entity.Item, id).pipe(
        map(() => new actions.RemoveSuccess(id)),
        // catchError((error: Error) => of(new actions.ErrorHandle({ error })))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private dataService: DataService
  ) { }
}
