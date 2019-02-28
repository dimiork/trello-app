import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError, take } from 'rxjs/operators';
import { Action, Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { getNewItemPositionIndex } from '../selectors/item';
import { State as AppState } from '../index';

import * as actions from '../actions/item';
import * as ErrorActions from '../actions/error';
import { Item, Entity } from '../../models';
import { DataService } from '../../services/data.service';

@Injectable()
export class ItemEffects {

  @Effect()
  loadItems$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.Load),
    mergeMap(() =>
      this.dataService.find(Entity.Item)
        .pipe(
          map((items: Item[]) => new actions.LoadSuccess({ items })),
          catchError((error: Error) => of(new ErrorActions.Error({ error })))
        ))
  );

  @Effect({ dispatch: true })
  addItem$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.Add),
    map((action: actions.Add) => action.payload.item),
    // mergeMap((item: Item) =>
    //   of(item).pipe(
    //     withLatestFrom(
    //       this.store$.pipe(select(getNewItemPositionIndex(item.listId)),
    //     ), ( item: Item, position: number ) => ({ item, position })),
    // )),
    mergeMap((item: Item) =>
      this.store$.pipe(select(getNewItemPositionIndex(item.listId)),
        take(1),
        map((position: number) => ({ item, position })),
      )
    ),
    mergeMap(({ item, position }: { item: Item, position: number}) =>
      this.dataService.insert(Entity.Item, { ...item, _position: position }).pipe(
        map((id: string) => new actions.AddSuccess({ item: { ...item, id, _position: position } }))
      )),
  );

  @Effect()
  updateItem$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.Update),
    map((action: actions.Update) => action.payload.item),
    mergeMap((item: Item) =>
      this.dataService.update(Entity.Item, item).pipe(
        map(() => new actions.UpdateSuccess({ id: item.id, changes: item })),
        catchError((error: Error) => of(new ErrorActions.Error({ error })))
      )
    )
  );

  @Effect()
  removeItem$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.Remove),
    map((action: actions.Remove) => action.payload.id),
    mergeMap((id: string) =>
      this.dataService.remove(Entity.Item, id).pipe(
        map(() => new actions.RemoveSuccess({ id })),
        catchError((error: Error) => of(new ErrorActions.Error({ error })))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private store$: Store<AppState>,
  ) { }
}
