import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Store, select } from '@ngrx/store';
import * as ListActions from '../store/list/actions';

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

  public loadLists(): Observable<List[]> {
    return of(this.localstorage.load(this.storageId));
  }

  public saveLists(lists: List[]): void {
    this.localstorage.save(this.storageId, lists);
  }

  public insert(list: List): Observable<List> {
    const storage = this.localstorage.load(this.storageId);
    list.id = list.id || this.generateUniqueId();
    this.localstorage.save(this.storageId, [ ...storage, list ]);

    return of(list);
  }

  public insertItem(listId: string | number, item: Item, index?: number): Observable<ServiceItem> {
    const storage = this.localstorage.load(this.storageId);
    item.id = item.id || this.generateUniqueId();

    const newStorage = storage.map((list: List) => {
      return list.id === listId ?
      {
        ...list,
        items: [ ...list.items.slice(0, index),
                 item,
                 ...list.items.slice(index)
               ]
      } : list;
    });
    this.localstorage.save(this.storageId, newStorage);

    return of({ listId, item, insertionIndex: index });

  }

  public update(list: List): Observable<List> {
    const storage = this.localstorage.load(this.storageId);
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

  public remove(id: string | number): Observable<{ id: string | number; }> {
    const storage = this.localstorage.load(this.storageId);
    this.localstorage.save(this.storageId, storage.filter((list) => {
      return list.id !== id;
    }));
  
    return of({ id });
  }

  public removeItem(listId: string | number, item: Item): Observable<ServiceItem> {
    const storage = this.localstorage.load(this.storageId);
    const newStorage = storage.map((list) => {
      if (list.id === listId) {
        return { 
          ...list,
          items: list.items.filter((currentItem) => currentItem.id !== item.id)
        };
      } else {
        return list;
      }
    });
    this.localstorage.save(this.storageId, newStorage);

    return of({ listId, item });
  }
}
