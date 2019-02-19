import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, EMPTY, of } from 'rxjs';
import { tap, map, mergeMap, switchMap, catchError } from 'rxjs/operators';

import { ListService } from '../../services/list.service';
// import { ActionTypes, ActionsUnion } from './actions';
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
          tap(lists => console.log(lists)),
          map((lists: List[]) => new actions.LoadSuccess(lists)),
          // catchError((error) => of(new actions.LoadFail(error)))

        )),
    catchError(error => of(new actions.LoadFail(error)))
    );

  @Effect()
  addList$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.Add),
    map((action: actions.Add) => action.payload),
    switchMap((title) =>
      this.listService.insert({
        id: null,
        title: title,
        items: []
      }).pipe(
        tap(list => console.log(list)),
        map(list => new actions.AddSuccess(list))
      )
    ),
    catchError(error => of(new actions.AddFail(error)))
  );

  @Effect()
  updateList$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.Update),
    map((action: actions.Update) => action.payload),
    switchMap((list) =>
      this.listService.update(list).pipe(
        tap(list => console.log(list)),
        map(list => new actions.UpdateSuccess(list))
      )
    ),
    // catchError(error => of(new actions.Fail(error)))
  );

  @Effect()
  removeList$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.Remove),
    map((action: actions.Remove) => action.payload),
    switchMap((id) =>
      this.listService.remove(id).pipe(
        tap(id => console.log(id)),
        map(id => new actions.RemoveSuccess(id))
      )
    ),
    // catchError(error => of(new actions.Fail(error)))
  );

  // @Effect()
  // updateList$ = this.actions$.pipe(
  //   ofType(actions.ActionTypes.AddItem),
  //   map((action: actions.AddItem) => action.payload)
  // );

  // @Effect({ dispatch: false })
  // saveLists$ = this.actions$.pipe(
  //   ofType(ActionTypes.Add),
  //   tap((data) => {
  //     console.log(data);
  //     this.listService.saveLists([{"id": "1", "title": "test", "items": []},{"id": "2", "title": "1Ginzburg", "items": []}])
  //   })
  // );


  constructor(
    private actions$: Actions,
    private listService: ListService
  ) {}
}
