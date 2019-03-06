import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from '../models';

type Status = 'success' | 'failed';
export class ApiResponse {
  constructor(status: Status = 'failed', message: string = 'error', user: User | null = null) {
    this.status = status;
    this.message = message;
    this.user = user;
  }
  status: Status;
  message: string;
  user: User | null;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private api_delay: number = 0;
  private storeId: string = '_api-users';

  signin(username: string, password: string): Observable<ApiResponse> {
    console.log(`[NETWORK] POST /auth/signin, params  ${ username }, ${ password }`);
    const user: User = this._findOne('username', username);
    if (user && user.pwdHash === this._genPwdHash(password) ) {
      const token: string = this._genToken(username);
      this._updateUserToken(username, token);
      const result: ApiResponse = new ApiResponse('success', 'ok', { ...user, token });
      console.log(result);

      return of(result).pipe(delay(this.api_delay));
    };
    const result: ApiResponse = new ApiResponse('failed', 'User is not find or password is incorrect', null);
    console.log(result);

    return of(result).pipe(delay(this.api_delay));
  }

  signup(username: string, password: string): Observable<ApiResponse> {
    console.log(`[NETWORK] POST /auth/signup, params ${ username }, ${ password }`);
    const user: User = this._findOne('username', username);
    if (!user) {
      const token: string = this._genToken(username);
      const newUser: User = {
        username,
        pwdHash: this._genPwdHash(password),
        role: 'user',
        token
      };
      this._addOne(newUser);
      const result: ApiResponse = new ApiResponse('success', 'User is created successful', newUser);
      console.log(result);

      return of(result).pipe(delay(this.api_delay));
    }
    const result: ApiResponse = new ApiResponse('failed', 'Acount with username ${ username } is already exists.', null);
    console.log(result);

    return of(result).pipe(delay(this.api_delay));
  }

  validateToken(token: string): Observable<ApiResponse> {
    console.log(`[NETWORK] POST /auth/token-validate, params ${ token }`);
    const user: User = this._findOne('token', token);
    if (!!user) {
      const result: ApiResponse = new ApiResponse('success', 'ok', user);
      console.log(result);

      return of(result).pipe(delay(this.api_delay));
    }
    const result: ApiResponse = new ApiResponse();
    console.log(result);

    return of(result);
  }

  private _updateUserToken(username: string, token: string): void {
    const users: User[] = this._findAll();
    const updatedUsers: User[] = users.map((user: User) => 
      user.username === username ? { ...user, token } : user);
    this._saveUsers(updatedUsers);
  }

  private _genToken(username: string): string {
    return `token-${ username }-${ Date.now() }`;
  }

  private _genPwdHash(password: string): string {
    return password.split('').reverse().join('');
  }

  private _findAll(): User[] {
    return JSON.parse(window.localStorage.getItem(this.storeId)) || [];
  }

  private _findOne(searchParameter: string, key: string): User {
    return this._findAll().find((user: User) => user[searchParameter] === key);
  }

  private _saveUsers(users: User[]): void {
    window.localStorage.setItem(this.storeId, JSON.stringify(users));
  }

  private _addOne(user: User): void {
    const users: User[] = this._findAll();
    this._saveUsers([ ...users, user ]);
  }
}
