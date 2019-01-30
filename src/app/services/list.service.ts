import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Store, select } from '@ngrx/store';
import * as ListActions from '../store/list/actions';

import { Item, List } from '../models';
import { LocalstorageService } from '../services/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private lists$: Observable<List[]>;

  constructor(
    private store: Store<List[]>,
    private localstorage: LocalstorageService,
  ) {

    const lists: List[] = this.localstorage.load();
    this.store.dispatch(new ListActions.Load(lists));

    this.lists$ = this.store.pipe(
      select('lists'),
      tap((listCollection: List[]) => {
        this.localstorage.save(listCollection);
      })
    );
  }

  public getLists(): Observable<List[]> {

    return this.lists$;
  }

  public createList(title: string): void {
    this.store.dispatch(new ListActions.Add(title));
  }

  public updateList(list: List): void {
    this.store.dispatch(new ListActions.Update(list));
  }

  public removeList(id: string): void {
    this.store.dispatch(new ListActions.Remove(id));
  }

  public addItem(listId: string, item: Item): void {
    this.store.dispatch(new ListActions.AddItem(listId, item));
  }

  public updateItem(listId: string, item: Item): void {
    this.store.dispatch(new ListActions.UpdateItem(listId, item));
  }

  public removeItem(listId: string, id: string): void {
    this.store.dispatch(new ListActions.RemoveItem(listId, id));
  }

}
