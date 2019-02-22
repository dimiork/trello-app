import { Injectable } from '@angular/core';

import { List } from '../models/list';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  _load(id: string): [] {
    return JSON.parse(window.localStorage.getItem(id)) || [];
  }

  _save(id: string, data: [] = []): void {
    if (data) {
      window.localStorage.setItem(id, JSON.stringify(data));
    }
  }

  clear(id: string): void {
    window.localStorage.removeItem(id);
  }

}
