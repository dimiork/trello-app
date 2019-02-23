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
  updateList$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.Update),
    map((action: actions.Update) => action.payload),
    switchMap((list: List) =>
      this.dataService.update(Entity.List, list).pipe(
        map(() => new actions.UpdateSuccess(list)),
        // catchError((error: Error) => of(new actions.ErrorHandle({ error })))
      )
    )
  );

  @Effect()
  removeList$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.Remove),
    map((action: actions.Remove) => action.payload),
    switchMap((id: string | number) =>
      this.dataService.remove(Entity.List, id).pipe(
        map(() => new actions.RemoveSuccess(id)),
        // catchError((error: Error) => of(new actions.ErrorHandle({ error })))
      )
    )
  );

  // @Effect()
  // addItem$: Observable<Action> = this.actions$.pipe(
  //   ofType(actions.ActionTypes.AddItem),
  //   map((action: actions.AddItem) => action.payload),
  //   switchMap(({ listId, item, insertionIndex }: ServiceItem) =>
  //     this.dataService.insertItem(listId, item, insertionIndex).pipe(
  //       map(() => new actions.AddItemSuccess({ listId, item, insertionIndex })),
  //       catchError((error: Error) => of(new actions.ErrorHandle({ error })))
  //     )
  //   )
  // );

  // @Effect()
  // removeItem$: Observable<Action> = this.actions$.pipe(
  //   ofType(actions.ActionTypes.RemoveItem),
  //   map((action: actions.RemoveItem) => action.payload),
  //   switchMap(({ listId, item }: ServiceItem) =>
  //     this.dataService.removeItem(listId, item).pipe(
  //       map(() => new actions.RemoveItemSuccess({ listId, item })),
  //       catchError((error: Error) => of(new actions.ErrorHandle({ error })))
  //     )
  //   )
  // );

  constructor(
    private actions$: Actions,
    private dataService: DataService
  ) { }
}
