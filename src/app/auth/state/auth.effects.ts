import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap, switchMap, map, catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import * as fromAuth from './auth.actions';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { Credentials } from '../models';
import { ApiService, ApiResponse } from '../services/api.service';

@Injectable()
export class AuthEffects {

  @Effect()
  checkLogin$: Observable<Action> = this.actions$.pipe(
    ofType<fromAuth.CheckAuth>(fromAuth.ActionTypes.CheckAuth),
    switchMap(() =>
      this.authService.checkAuth().pipe(
        map((response: ApiResponse | null) => {
          if (response === null) {
            return new fromAuth.LoginFailure({ error: 'There is no active token in the browser.' });
          }
          if (!!response && response.status === 'success') {
            this.router.navigate(['/tasks']);

            return new fromAuth.LoginSuccess({ user: response.user });
          } else {
            return new fromAuth.LoginFailure({ error: 'response.message' });
          }
        })
      )
    )
  );

  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType<fromAuth.Login>(fromAuth.ActionTypes.Login),
    map((action: fromAuth.Login) => action.payload.credentials),
    switchMap(({ username, password }: Credentials) =>
      this.apiService.signin(username, password)
        .pipe(
          map((result: any) => {
            if (result.status === 'success') {
              this.authService.storeToken(result.user.token);
              this.router.navigate(['/user']);

              return new fromAuth.LoginSuccess(result.user);
            }

            return new fromAuth.LoginFailure(result.message);
          }),
          catchError((error: any) => of(new fromAuth.LoginFailure(error)))
        ))
  );

  @Effect()
  signup$: Observable<Action> = this.actions$.pipe(
    ofType<fromAuth.Signup>(fromAuth.ActionTypes.Signup),
    map((action: fromAuth.Signup) => action.payload.credentials),
    switchMap(({ username, password }: Credentials) =>
      this.apiService.signup(username, password)
        .pipe(
          map((result: any) => {
            if (result.status === 'success') {
              this.authService.storeToken(result.user.token);
              this.router.navigate(['/tasks']);

              return new fromAuth.LoginSuccess(result.user);
            }

            return new fromAuth.LoginFailure(result.message);
          }),
          catchError((error: any) => of(new fromAuth.LoginFailure(error)))
        ))
  );

  @Effect({ dispatch: false })
  logout$: Observable<Action> = this.actions$.pipe(
    ofType<fromAuth.Logout>(fromAuth.ActionTypes.Logout),
    tap(() => [
      this.authService.removeToken(),
      this.router.navigate(['/login'])
    ])
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router,
    private dialogService: MatDialog
  ) {}
}
