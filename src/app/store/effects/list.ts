import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as actions from '../actions/list';
import { List, ServiceItem, Entity } from '../../models';
import { ListService } from '../../services/list.service';

@Injectable()
export class ListEffects {

  @Effect()
  loadLists$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.Load),
    switchMap(() =>
      this.listService.find(Entity.Lists)
        .pipe(
          map((lists: List[]) => new actions.LoadSuccess(lists)),
          // catchError((error: Error) => of(new actions.ErrorHandle({ error })))
        ))
    );

  @Effect()
  addList$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.Add),
    map((action: actions.Add) => action.payload),
    switchMap((title: string) =>
      this.listService.insert(Entity.Lists, {
        id: null,
        title: title,
      }).pipe(
        map(() => new actions.AddSuccess({ title })),
        // catchError((error: Error) => of(new actions.ErrorHandle({ error })))
      )
    )
  );

  @Effect()
  updateList$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.Update),
    map((action: actions.Update) => action.payload),
    switchMap((list: List) =>
      this.listService.update(Entity.Lists, list).pipe(
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
      this.listService.remove(Entity.Lists, id).pipe(
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
  //     this.listService.insertItem(listId, item, insertionIndex).pipe(
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
  //     this.listService.removeItem(listId, item).pipe(
  //       map(() => new actions.RemoveItemSuccess({ listId, item })),
  //       catchError((error: Error) => of(new actions.ErrorHandle({ error })))
  //     )
  //   )
  // );

  constructor(
    private actions$: Actions,
    private listService: ListService
  ) {}
}
