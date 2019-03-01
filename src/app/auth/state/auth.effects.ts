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
  @Effect({ dispatch: false })
  login$: Observable<Action> = this.actions$.pipe(
    ofType<fromAuth.Login>(fromAuth.AuthActionTypes.Login),
    map((action: fromAuth.Login) => action.payload.credentials),
    mergeMap((credentials: Credentials) =>
      this.authService.login(credentials)
        .pipe(
          map((token: string) => new fromAuth.LoginSuccess({ token })),
          catchError((error: any) => of(new fromAuth.LoginFailure(error)))
        ))
  );

  @Effect({ dispatch: false })
  loginSuccess$: Observable<Action> = this.actions$.pipe(
    ofType<fromAuth.LoginSuccess>(fromAuth.AuthActionTypes.LoginSuccess),
    tap(() => {
      this.authService.setAuth(true);
      this.router.navigate([this.authService.authSuccessUrl]);
    }),
  );

  // @Effect({ dispatch: false })
  // loginErrorRedirect$ = this.actions$
  //   .ofType<fromAuth.LoginFailure>(fromAuth.AuthActionTypes.LoginFailure)
  //   .pipe(
  //     map(action => action.payload),
  //     tap((err: any) => {
  //       if (err.error_description) {
  //         console.error(`Error: ${err.error_description}`);
  //       } else {
  //         console.error(`Error: ${JSON.stringify(err)}`);
  //       }
  //       this.router.navigate([this.authService.authFailureUrl]);
  //     })
  //   );

  @Effect()
  checkLogin$: Observable<Action> = this.actions$.pipe(
    ofType<fromAuth.CheckLogin>(fromAuth.AuthActionTypes.CheckLogin),
    mergeMap(() =>
      // if (this.authService.authenticated) {
        this.authService.getToken().pipe(
          // tap((token: string) => console.log(token)),
          map((token: string) => new fromAuth.LoginSuccess({ token }))
        )
      // } else {
      //   return of(new fromAuth.LoginFailure('error'));
      // }
    )
  );

  // @Effect()
  // logoutConfirmation$ = this.actions$.ofType<fromAuth.Logout>(fromAuth.AuthActionTypes.Logout).pipe(
  //   exhaustMap(() =>
  //     this.dialogService
  //       .open(LogoutPromptComponent)
  //       .afterClosed()
  //       .pipe(
  //         map(confirmed => {
  //           if (confirmed) {
  //             return new fromAuth.LogoutConfirmed();
  //           } else {
  //             return new fromAuth.LogoutCancelled();
  //           }
  //         })
  //       )
  //   )
  // );

  // @Effect({ dispatch: false })
  // logout$ = this.actions$
  //   .ofType<fromAuth.LogoutConfirmed>(fromAuth.AuthActionTypes.LogoutConfirmed)
  //   .pipe(tap(() => this.authService.logout()));

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private dialogService: MatDialog
  ) {}
}
