import { Injectable } from '@angular/core';

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
