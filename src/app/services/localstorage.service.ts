import { Injectable } from '@angular/core';

import { List } from '../models/list';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  load(id: string): List[] {
    return JSON.parse(window.localStorage.getItem(id)) || [];
  }

  save(id: string, data: List[]): void {
    if (data) {
      window.localStorage.setItem(id, JSON.stringify(data));
    }
  }

  clear(id: string): void {
    window.localStorage.removeItem(id);
  }
}
