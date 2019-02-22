import { Injectable } from '@angular/core';

import { Observable, of, combineLatest } from 'rxjs';
import { filter, map, merge } from 'rxjs/operators';

import { LocalstorageService } from '../services/localstorage.service';
import { Item, Card, List, ServiceItem, Entity } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private storageId: string = 'yet-another-trello';

  constructor(
    private localstorage: LocalstorageService,
  ) {}

  private generateUniqueId(): string | number {
    return Math.random().toString(26).slice(2);
  }

  private load(entity: Entity): any {
    return this.localstorage._load(entity);
  }

  private save(entity: Entity, data: any): void {
    this.localstorage._save(entity, data);
  }

  find(entity: Entity): Observable<List[] | Card[]> {
    return of(this.load(entity));
  }

  findOne(entity: Entity, id: number): Observable<List> {
    const lists$: Observable<List[]> = this.find(entity);

    return lists$.pipe(filter((list: List) => list.id === id)[0]);
  }

  insert(entity: Entity, list: List): Observable<boolean> {
    const lists: List[] = this.load(entity);
    list.id = list.id || this.generateUniqueId();
    this.save(entity, [ ...lists, list ]);

    return of(true);
  }

  update(entity: Entity, data: List): Observable<boolean> {
    const storage: List[] = this.load(entity);
    const updated: List[] = storage.map((el: List) => el.id === data.id ? data : el);
    this.save(entity, updated);

    return of(true);

  }

  remove(entity: Entity, id: string | number): Observable<boolean> {
    const lists: List[] = this.load(entity);
    const updated: List[] = lists.filter((el: List) => el.id !== id);
    this.save(entity, updated);

    return of(true);
  }

  // fetch(): Observable<List[]> {
  //   return of(this.load());
  // }

  // insert(list: List): Observable<List> {
  //   const storage: List[] = this.load();
  //   list.id = list.id || this.generateUniqueId();
  //   this.save([ ...storage, list ]);

  //   return of(list);
  // }

  // update(list: List): Observable<List> {
  //   const storage: List[] = this.load();
  //   this.save(storage.map((el: List) => {
  //     if (el.id === list.id) {
  //       return {
  //         ...el,
  //         title: list.title,
  //         items: [ ...list.items ]
  //       };
  //     }

  //     return el;
  //   }));

  //   return of(list);
  // }

  // remove(id: string | number): Observable<string | number> {
  //   const storage: List[] = this.load();
  //   const newStorage: List[] = storage.filter((list: List) =>
  //     list.id !== id);
  //   this.save(newStorage);

  //   return of(id);
  // }

  // insertItem(listId: string | number, item: Item, index?: number): Observable<ServiceItem> {
  //   const storage: List[] = this.load();
  //   item.id = item.id || this.generateUniqueId();

  //   const newStorage: List[] = storage.map((list: List) => {
  //     return list.id === listId ?
  //     {
  //       ...list,
  //       items: [ ...list.items.slice(0, index),
  //                item,
  //                ...list.items.slice(index)
  //              ]
  //     } : list;
  //   });
  //   this.save(newStorage);

  //   return of({ listId, item, insertionIndex: index });

  // }

  // removeItem(listId: string | number, item: Item): Observable<ServiceItem> {
  //   const storage: List[] = this.load();
  //   const newStorage: List[] = storage.map((list: List) => {
  //     if (list.id === listId) {
  //       return {
  //         ...list,
  //         items: list.items.filter((currentItem: Item) => currentItem.id !== item.id)
  //       };
  //     } else {
  //       return list;
  //     }
  //   });
  //   this.save(newStorage);

  //   return of({ listId, item });
  // }
}
