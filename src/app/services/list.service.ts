import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Store, select } from '@ngrx/store';
import * as ListActions from '../store/actions/list';

import { Item, List, ServiceItem } from '../models';
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

  private generateUniqueId(): string | number {
    return Math.random().toString(26).slice(2);
  }

  private load(): List[] {
    return this.localstorage.load(this.storageId);
  }

  private save(lists: List[]): void {
    this.localstorage.save(this.storageId, lists);
  }

  fetch(): Observable<List[]> {
    return of(this.localstorage.load(this.storageId));
  }

  insert(list: List): Observable<List> {
    const storage: List[] = this.load();
    list.id = list.id || this.generateUniqueId();
    this.save([ ...storage, list ]);

    return of(list);
  }

  update(list: List): Observable<List> {
    const storage: List[] = this.load();
    this.save(storage.map((el: List) => {
      if (el.id === list.id) {
        return {
          ...el,
          title: list.title,
          items: [ ...list.items ]
        };
      }

      return el;
    }));

    return of(list);
  }

  remove(id: string | number): Observable<{ id: string | number; }> {
    const storage: List[] = this.load();
    const newStorage: List[] = storage.filter((list: List) =>
      list.id !== id);
    this.save(newStorage);

    return of({ id });
  }

  insertItem(listId: string | number, item: Item, index?: number): Observable<ServiceItem> {
    const storage: List[] = this.load();
    item.id = item.id || this.generateUniqueId();

    const newStorage: List[] = storage.map((list: List) => {
      return list.id === listId ?
      {
        ...list,
        items: [ ...list.items.slice(0, index),
                 item,
                 ...list.items.slice(index)
               ]
      } : list;
    });
    this.save(newStorage);

    return of({ listId, item, insertionIndex: index });

  }

  removeItem(listId: string | number, item: Item): Observable<ServiceItem> {
    const storage: List[] = this.load();
    const newStorage: List[] = storage.map((list: List) => {
      if (list.id === listId) {
        return {
          ...list,
          items: list.items.filter((currentItem: Item) => currentItem.id !== item.id)
        };
      } else {
        return list;
      }
    });
    this.save(newStorage);

    return of({ listId, item });
  }
}
