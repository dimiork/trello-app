import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Store, select } from '@ngrx/store';
import * as ListActions from '../store/list/actions';

import { Item, List, EditItemModal } from '../models';
import { LocalstorageService } from '../services/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private storageId: string = 'trello-lists';
  private lists$: Observable<List[]>;

  constructor(
    private store: Store<List[]>,
    private localstorage: LocalstorageService,
  ) {}

  private getUniqueId(): string {
    return Math.random().toString(26).slice(2);
  }

  public loadLists(): Observable<List[]> {
    return of(this.localstorage.load(this.storageId));
  }

  public saveLists(lists: List[]): void {
    this.localstorage.save(this.storageId, lists);
  }

  public insert(list: List): Observable<List> {
    let storage = this.localstorage.load(this.storageId);
    const newList = {
      ...list,
      id: this.getUniqueId(),
    };
    this.localstorage.save(this.storageId, [ ...storage, newList]);
    return of(newList);
  }

  public insertItem(listId: string, item: Item): Observable<EditItemModal> {
    let storage = this.localstorage.load(this.storageId);
    if (!item.id) {
      item = {
        ...item,
        id: this.getUniqueId()
      };
    }
    this.localstorage.save(this.storageId, storage.map((list: List) => {
      return list.id === listId ?
      {
        ...list,
        items: [ ...list.items, item ]
      } : list;
    }));

    return of({ listId, item: item });

  }

  public update(list: List): Observable<List> {
    let storage = this.localstorage.load(this.storageId);
    this.localstorage.save(this.storageId,
      storage.map((el: List) => {
      if (el.id === list.id) {
        return {
          ...el,
          title: list.title,
          items: [ ...list.items ]
        }
      }
      return el;
    }));
    return of(list);
  }

  public remove(id: string): Observable<string> {
    let storage = this.localstorage.load(this.storageId);
    if (storage.some((el) => el.id === id)) {
      this.localstorage.save(this.storageId, storage.filter((el) => el.id !== id));
      return of(id);
    }
    throw Error(` ${ id } was not found. Nothing to be removed.`);
  }

  public removeItem(listId: string, itemId: string): Observable<boolean> {
    let storage = this.localstorage.load(this.storageId);
    if (storage.some((el) => el.id === listId)) {
      let newStorage = storage.map((el) => {
        if (el.id === listId) {
          return { ...el, items: el.items.filter((item) => item.id !== itemId) };
        }
      });
      this.localstorage.save(this.storageId, newStorage);
      return of(true);
    }
    return of(false);
  }

  /* old scheme */

  // public createList(title: string): void {
  //   this.store.dispatch(new ListActions.Add(title));
  // }

  // public updateList(list: List): void {
  //   this.store.dispatch(new ListActions.Update(list));
  // }

  // public removeList(id: string): void {
  //   this.store.dispatch(new ListActions.Remove(id));
  // }

  // public addItem(listId: string, item: Item): void {
  //   this.store.dispatch(new ListActions.AddItem(listId, item));
  // }

  // public updateItem(listId: string, item: Item): void {
  //   this.store.dispatch(new ListActions.UpdateItem(listId, item));
  // }

  // public removeItem(listId: string, id: string): void {
  //   this.store.dispatch(new ListActions.RemoveItem(listId, id));
  // }

}
