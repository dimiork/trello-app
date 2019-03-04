import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { Credentials } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _admin: Credentials = { username: 'admin', password: 'admin'};
  authSuccessUrl: string = 'tasks';
  private _authenticated: boolean = false;

  get authenticated(): boolean {
    return this._authenticated;
  }

  set authenticated(state: boolean) {
    this._authenticated = state;
  }

  public login(credentials: Credentials): Observable<any> {
    if (credentials.username === this._admin.username &&
      credentials.password === this._admin.password) {
        this.authenticated = true;
        this.setToken(`TOKEN_ID_${ Math.random() }`);

        return of(true);
      }

      return of(Error);
  }

  private setToken(token: string): void {
    window.localStorage.setItem('token', token);
  }

  getToken(): Observable<string> {
    return of(localStorage.getItem('token'));
  }

  logOut(): void {
    this.authenticated = false;
    this.removeToken();
  }

  private removeToken(): void {

    localStorage.removeItem('token');
  }
}
