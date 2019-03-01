import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as ListActions from '../actions/list';
import * as ItemActions from '../actions/item';
import { Item, List, Entity } from '../../models';
import { DataService } from '../../services/task-api.service';

@Injectable()
export class ListEffects {

  @Effect()
  loadLists$: Observable<Action> = this.actions$.pipe(
    ofType(ListActions.ActionTypes.Load),
    switchMap(() =>
      this.dataService.find(Entity.List)
        .pipe(
          map((lists: List[]) => new ListActions.LoadSuccess({ lists })),
          // catchError((error: Error) => of(new ErrorActions.Error({ error })))
        ))
    );

  @Effect()
  addList$: Observable<Action> = this.actions$.pipe(
    ofType(ListActions.ActionTypes.Add),
    map((action: ListActions.Add) => action.payload.list),
    switchMap((list: List) =>
      this.dataService.insert(Entity.List, list).pipe(
        map((id: string) => new ListActions.AddSuccess({ list: { ...list, id } })),
        // catchError((error: Error) => of(new ErrorActions.Error({ error })))
      )
    )
  );

  @Effect()
  updateList$: Observable<Action> = this.actions$.pipe(
    ofType(ListActions.ActionTypes.Update),
    map((action: ListActions.Update) => action.payload.list),
    switchMap((list: List) =>
      this.dataService.update(Entity.List, list).pipe(
        map(() => new ListActions.UpdateSuccess({ id: list.id, changes: list })),
        // catchError((error: Error) => of(new ErrorActions.Error({ error })))
      )
    )
  );

  @Effect()
  removeList$: Observable<Action> = this.actions$.pipe(
    ofType(ListActions.ActionTypes.Remove),
    map((action: ListActions.Remove) => action.payload.id),
    switchMap((id: string) =>
      this.dataService.remove(Entity.List, id).pipe(
        // catchError((error: Error) => of(new ErrorActions.Error({ error })))
      )
    ),
    switchMap((id: string) => [
      new ListActions.RemoveSuccess({ id }),
      new ItemActions.RemoveAllByListId({ listId: (item: Item): boolean => item.listId === id })
    ])
  );

  constructor(
    private actions$: Actions,
    private dataService: DataService
  ) {}
}
