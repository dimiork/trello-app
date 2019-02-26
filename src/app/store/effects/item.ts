import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as actions from '../actions/item';
import * as ErrorActions from '../actions/error';
import { Item, List, Entity } from '../../models';
import { DataService } from '../../services/data.service';

import { MatDialog } from '@angular/material';
import { EditItemComponent } from '../../components/edit-item/edit-item.component';

@Injectable()
export class ItemEffects {

  @Effect()
  loadItems$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.Load),
    switchMap(() =>
      this.dataService.find(Entity.Item)
        .pipe(
          map((items: Item[]) => new actions.LoadSuccess({ items })),
          catchError((error: Error) => of(new ErrorActions.Error({ error })))
        ))
  );

  @Effect()
  addItem$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.Add),
    map((action: actions.Add) => action.payload.item),
    switchMap((item: Item) =>
      this.dataService.insert(Entity.Item, item).pipe(
        map((id: string) => new actions.AddSuccess({ item: { ...item, id } })),
        catchError((error: Error) => of(new ErrorActions.Error({ error })))
      )
    )
  );

  @Effect({ dispatch: false })
  openEditItem$: Observable<Item> = this.actions$.pipe(
    ofType(actions.ActionTypes.OpenEdit),
    map((action: actions.OpenEdit) => action.payload.item),
    tap((item: Item) => this.dialog.open(EditItemComponent, {
      panelClass: 'edit-item-dialog-container',
      data: item
    }) ),
  );

  @Effect()
  updateItem$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.Update),
    map((action: actions.Update) => action.payload.item),
    switchMap((item: Item) =>
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
    switchMap((id: string) =>
      this.dataService.remove(Entity.Item, id).pipe(
        map(() => new actions.RemoveSuccess({ id })),
        catchError((error: Error) => of(new ErrorActions.Error({ error })))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private dialog: MatDialog,
  ) { }
}
