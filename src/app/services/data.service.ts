import { Injectable } from '@angular/core';

import { Observable, of, combineLatest } from 'rxjs';
import { filter, map, merge } from 'rxjs/operators';

import { LocalstorageService } from '../services/localstorage.service';
import { Item, List, Entity } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DataService {

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

  find(entity: Entity): Observable<List[] | Item[]> {
    return of(this.load(entity));
  }

  findOne(entity: Entity, id: number): Observable<List> {
    const lists$: Observable<List[]> = this.find(entity);

    return lists$.pipe(filter((list: List) => list.id === id)[0]);
  }

  insert(entity: Entity, list: List): Observable<string | number> {
    const lists: List[] = this.load(entity);
    list.id = list.id || this.generateUniqueId();
    this.save(entity, [ ...lists, list ]);

    return of(list.id);
  }

  update(entity: Entity, data: List): Observable<boolean> {
    const storage: List[] = this.load(entity);
    const updated: List[] = storage.map((el: List) => el.id === data.id ? data : el);
    this.save(entity, updated);

    return of(true);

  }

  remove(entity: Entity, id: string | number): Observable<string | number> {
    const prevStorage: List[] | Item[] = this.load(entity);
    const updatedStorage: List[] | Item[] = prevStorage.filter((el: List | Item) => el.id !== id);
    if (entity === Entity.List) {
      const prevItems: Item[] = this.load(Entity.Item);
      const updatedItems: Item[] = prevItems.filter((el: Item) => el.listId !== id);
      this.save(Entity.Item, updatedItems);
    }
    this.save(entity, updatedStorage);

    return of(id);
  }
}
