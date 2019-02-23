import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as ListActions from '../actions/list';
import * as ItemActions from '../actions/item';
import { List, Entity } from '../../models';
import { DataService } from '../../services/data.service';

@Injectable()
export class ListEffects {

  @Effect()
  loadLists$: Observable<Action> = this.actions$.pipe(
    ofType(ListActions.ActionTypes.Load),
    switchMap(() =>
      this.dataService.find(Entity.List)
        .pipe(
          map((lists: List[]) => new ListActions.LoadSuccess(lists)),
          // catchError((error: Error) => of(new ListActions.ErrorHandle({ error })))
        ))
    );

  @Effect()
  addList$: Observable<Action> = this.actions$.pipe(
    ofType(ListActions.ActionTypes.Add),
    map((action: ListActions.Add) => action.payload),
    switchMap((title: string) =>
      this.dataService.insert(Entity.List, { title: title }).pipe(
        map((id: string | number) => new ListActions.AddSuccess({ id, title })),
        // catchError((error: Error) => of(new ListActions.ErrorHandle({ error })))
      )
    )
  );

  @Effect()
  updateList$: Observable<Action> = this.actions$.pipe(
    ofType(ListActions.ActionTypes.Update),
    map((action: ListActions.Update) => action.payload),
    switchMap((list: List) =>
      this.dataService.update(Entity.List, list).pipe(
        map(() => new ListActions.UpdateSuccess(list)),
        // catchError((error: Error) => of(new ListActions.ErrorHandle({ error })))
      )
    )
  );

  // @Effect()
  // removeList$: Observable<Action> = this.actions$.pipe(
  //   ofType(ListActions.ActionTypes.Remove),
  //   map((action: ListActions.Remove) => action.payload),
  //   switchMap((id: string | number) =>
  //     this.dataService.remove(Entity.Lists, id).pipe(
  //       map(() => new ListActions.RemoveSuccess(id)),
  //       // catchError((error: Error) => of(new ListActions.ErrorHandle({ error })))
  //     )
  //   )
  // );

  @Effect()
  removeList$: Observable<Action> = this.actions$.pipe(
    ofType(ListActions.ActionTypes.Remove),
    map((action: ListActions.Remove) => action.payload),
    switchMap((id: string | number) =>
      this.dataService.remove(Entity.List, id)

      // .pipe(
      //   map(() => new ListActions.RemoveSuccess(id)),
      //   // catchError((error: Error) => of(new ListActions.ErrorHandle({ error })))
      // )
    ),
    switchMap((id: string | number) => [
      new ListActions.RemoveSuccess(id),
      new ItemActions.RemoveAllByList(id)
    ])
  );

  // @Effect()
  // addItem$: Observable<Action> = this.actions$.pipe(
  //   ofType(ListActions.ActionTypes.AddItem),
  //   map((action: ListActions.AddItem) => action.payload),
  //   switchMap(({ listId, item, insertionIndex }: ServiceItem) =>
  //     this.dataService.insertItem(listId, item, insertionIndex).pipe(
  //       map(() => new ListActions.AddItemSuccess({ listId, item, insertionIndex })),
  //       catchError((error: Error) => of(new ListActions.ErrorHandle({ error })))
  //     )
  //   )
  // );

  // @Effect()
  // removeItem$: Observable<Action> = this.actions$.pipe(
  //   ofType(ListActions.ActionTypes.RemoveItem),
  //   map((action: ListActions.RemoveItem) => action.payload),
  //   switchMap(({ listId, item }: ServiceItem) =>
  //     this.dataService.removeItem(listId, item).pipe(
  //       map(() => new ListActions.RemoveItemSuccess({ listId, item })),
  //       catchError((error: Error) => of(new ListActions.ErrorHandle({ error })))
  //     )
  //   )
  // );

  constructor(
    private actions$: Actions,
    private dataService: DataService
  ) {}
}
