import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  _load<T>(id: string): T[] {
    return JSON.parse(window.localStorage.getItem(id)) || [];
  }

  _save<T>(id: string, data: T[] = []): void {
    if (data) {
      window.localStorage.setItem(id, JSON.stringify(data));
    }
  }

  clear(id: string): void {
    window.localStorage.removeItem(id);
  }

}
