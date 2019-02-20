import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, EMPTY, of } from 'rxjs';
import { tap, map, mergeMap, switchMap, catchError } from 'rxjs/operators';

import { ListService } from '../../services/list.service';
import * as actions from './actions';

import { List } from '../../models/list';

@Injectable()
export class ListEffects {

  @Effect()
  loadLists$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.Load),
    switchMap(() =>
      this.listService.loadLists()
        .pipe(
          map((lists: List[]) => new actions.LoadSuccess({ lists })),
          catchError(error => of(new actions.ErrorHandle({ error })))
        ))
    );

  @Effect()
  addList$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.Add),
    map((action: actions.Add) => action.payload),
    switchMap(({ title }) =>
      this.listService.insert({
        id: null,
        title: title,
        items: []
      }).pipe(
        map(list => new actions.AddSuccess({ list })),
        catchError(error => of(new actions.ErrorHandle({ error })))
      )
    )
  );

  @Effect()
  updateList$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.Update),
    map((action: actions.Update) => action.payload),
    switchMap(({ list }) =>
      this.listService.update(list).pipe(
        map(list => new actions.UpdateSuccess({ list })),
        catchError(error => of(new actions.ErrorHandle({ error })))
      )
    )
  );

  @Effect()
  removeList$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.Remove),
    map((action: actions.Remove) => action.payload),
    switchMap(({ id }) =>
      this.listService.remove(id).pipe(
        map(({ id }) => new actions.RemoveSuccess({ id })),
        catchError(error => of(new actions.ErrorHandle({ error }))) 
      )
    )
  );

  @Effect()
  addItem$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.AddItem),
    map((action: actions.AddItem) => action.payload),
    switchMap(({ listId, item, insertionIndex }) =>
      this.listService.insertItem(listId, item, insertionIndex).pipe(
        map(data => new actions.AddItemSuccess({ listId, item, insertionIndex })),
        catchError(error => of(new actions.ErrorHandle({ error })))
      )
    )
  );

  @Effect()
  removeItem$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.RemoveItem),
    map((action: actions.RemoveItem) => action.payload),
    switchMap(({ listId, item }) =>
      this.listService.removeItem(listId, item).pipe(
        map(data => new actions.RemoveItemSuccess({ listId: data.listId, item: data.item })),
        catchError(error => of(new actions.ErrorHandle({ error })))
      )
    )
  );

  @Effect({ dispatch: false })
  logError$: Observable<Action> = this.actions$.pipe(
      ofType(actions.ActionTypes.ErrorHandle),
      tap(error => console.log(error))
  )

  constructor(
    private actions$: Actions,
    private listService: ListService
  ) {}
}
