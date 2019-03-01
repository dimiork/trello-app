import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { Credentials } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authSuccessUrl: string = 'tasks';
  authenticated: boolean = true;
  token: string = 'token-id-1234567890';

  login(credentials: Credentials): Observable<string> {
    const token: string = 'token_id';

    return of(token);
  }
  setAuth(flag: boolean): void {
    this.authenticated = flag;
  }

  getToken(): Observable<string> {
    return of(this.token);
  }
}
