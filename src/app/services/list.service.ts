import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Store, select } from '@ngrx/store';
import * as ListActions from '../store/list/actions';

import { Item, List } from '../models';
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
  ) {

    // this.lists$ = this.store.pipe(
    //   select('lists'),
    //   tap((listCollection: List[]) => {
    //     console.log(listCollection);
    //     this.localstorage.save(this.storageId, listCollection);
    //   })
    // );
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
      id: Math.random().toString(26).slice(2),
    }
    this.localstorage.save(this.storageId, [ ...storage, newList]);
    return of(newList);
  }

  public update(list: List): Observable<List> {
    let storage = this.localstorage.load(this.storageId);
    this.localstorage.save(this.storageId,
      storage.map((el: List) => {
      if (el.id === list.id) {
        return {
          ...el,
          title: list.title,
          items: [ ...el.items ]
        }
      }
      return el;
    }));
    // this.localstorage.save(this.storageId, [
    //   ...storage.filter((el) => el.id !== list.id),
    //   list
    // ]);
    return of(list);
  }

// return state.map((list: List) => {
//   if (list.id === action.list.id) {

//           return {
//             ...list,
//             title: action.list.title.trim(),
//             items: [...action.list.items]
//           };
//         }

//         return list;

  public remove(id: string): Observable<string> {
    let storage = this.localstorage.load(this.storageId);
    if (storage.some((el) => el.id === id)) {
      this.localstorage.save(this.storageId, storage.filter((el) => el.id !== id));
      return of(id);
    }
    throw Error(` ${ id } was not found. Nothing to be removed.`);
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
