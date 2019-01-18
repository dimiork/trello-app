import { Injectable } from '@angular/core';

import { List } from '../models/list';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  public name: string = 'trello-lists';

  // constructor() { }

  load(): List[] {
    return window.localStorage.getItem(this.name);
  }

  save(data: List[]): void {
    if (!!data) {
      window.localStorage.setItem(this.name, JSON.stringify(data));
    }
  }

  clear(): void {
    window.localStorage.removeItem(this.name);
  }
}
