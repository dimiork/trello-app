import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { filter } from 'rxjs/operators';

import { LocalstorageService } from '../services/localstorage.service';
import { Item, Entity } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private localstorage: LocalstorageService,
  ) {}

  private generateUniqueId(): string {
    return Math.random().toString(26).slice(2);
  }

  private load<T>(entity: Entity): T[] {
    return this.localstorage._load(entity);
  }

  private save<T>(entity: Entity, data: T[]): void {
    this.localstorage._save(entity, data);
  }

  find<T>(entity: Entity): Observable<T[]> {
    return of(this.load(entity));
  }

  findOne<T extends { id: string | number }>(entity: Entity, id: string | number): Observable<T> {
    const data$: Observable<T[]> = this.find(entity);

    return data$.pipe(filter((elem: T) => elem.id === id)[0]);
  }

  insert<T extends { id?: string | number; title?: string }>(entity: Entity, data: T): Observable<string | number> {
    const storage: T[] = this.load(entity);
    data.id = data.id || this.generateUniqueId();
    this.save(entity, [ ...storage, data ]);

    return of(data.id);
  }

  update<T extends { id?: string | number }>(entity: Entity, data: T): Observable<boolean> {
    const storage: T[] = this.load(entity);
    const updated: T[] = storage.map((el: T) => el.id === data.id ? data : el);
    this.save(entity, updated);

    return of(true);
  }

  remove<T extends { id: string | number }>(entity: Entity, id: string | number): Observable<string | number> {
    const prevStorage: T[] = this.load(entity);
    const updatedStorage: T[] = prevStorage.filter((el: T) => el.id !== id);
    if (entity === Entity.List) {
      const prevItems: Item[] = this.load(Entity.Item);
      const updatedItems: Item[] = prevItems.filter((el: Item) => el.listId !== id);
      this.save(Entity.Item, updatedItems);
    }
    this.save(entity, updatedStorage);

    return of(id);
  }
}
