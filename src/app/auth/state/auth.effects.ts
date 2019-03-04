import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap, exhaustMap, mergeMap, map, catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import * as fromAuth from './auth.actions';
import { AuthService } from '../services/auth.service';
import { Observable, of, empty } from 'rxjs';
import { Credentials } from '../models';

@Injectable()
export class AuthEffects {
  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType<fromAuth.Login>(fromAuth.AuthActionTypes.Login),
    map((action: fromAuth.Login) => action.payload),
    mergeMap((credentials: Credentials) =>
      this.authService.login(credentials)
        .pipe(
          map((result: boolean) => {
            if (result) {
              return new fromAuth.LoginSuccess(result);
            }
            return new fromAuth.LoginFailure(result)
          }),
          catchError((error: any) => of(new fromAuth.LoginFailure(error)))
        ))
  );

  @Effect({ dispatch: false })
  loginSuccess$: Observable<Action> = this.actions$.pipe(
    ofType<fromAuth.LoginSuccess>(fromAuth.AuthActionTypes.LoginSuccess),
    tap(() => {
      this.authService.authenticated = true;
      this.router.navigate([this.authService.authSuccessUrl]);
    }),
  );

  @Effect()
  checkLogin$: Observable<Action> = this.actions$.pipe(
    ofType<fromAuth.CheckLogin>(fromAuth.AuthActionTypes.CheckLogin),
    mergeMap(() => {
      if (this.authService.authenticated) {
        // this.authService.getToken().pipe(
        //   // tap((token: string) => console.log(token)),
        //   map((token: string) => new fromAuth.LoginSuccess({ token }))
        // )
      } else {
        return of(new fromAuth.LoginFailure('error'));
      }
    })
  );

  @Effect({ dispatch: false })
  logout$: Observable<Action> = this.actions$.pipe(
    ofType<fromAuth.Logout>(fromAuth.AuthActionTypes.Logout),
    tap(() => this.authService.logOut())
  )
    // .ofType<fromAuth.Logout>(fromAuth.AuthActionTypes.Logout)
    // .pipe(tap(() => this.authService.logout()));

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private dialogService: MatDialog
  ) {}
}
