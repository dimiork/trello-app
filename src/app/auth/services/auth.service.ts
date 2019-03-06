import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models';

import { ApiService, ApiResponse } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private api: ApiService) {}

  checkAuth(): Observable<ApiResponse | null> {
    const token: string = this.getToken();
    if (!!token) {
      return this.api.validateToken(token);
    }

    return of(null);
  }

  storeToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  // storeUser(user: User): void {
  //   localStorage.setItem('user', JSON.stringify(user));
  // }

  // getUser(): User {
  //   return JSON.parse(localStorage.getItem('user'));
  // }

  // removeUser(): void {
  //   localStorage.removeItem('user');
  // }

  // createBase64Auth(username: string, password: string): string {
  //   return `Basic ${btoa(`${username}:${password}`)}`;
  // }
}
