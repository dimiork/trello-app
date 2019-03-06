import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromStore from '../../state';
import { Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store<fromStore.State>,
  ) {}

  canActivate(): Observable<boolean> {
    return this.checkStoreAuthentication().pipe(
      mergeMap((isLoggedIn: boolean) => {
        if (!!isLoggedIn) {
          return of(true);
        }
        this.router.navigate(['/login']);

        return of(false);
      }),
    );
  }

  checkStoreAuthentication(): Observable<boolean> {
    return this.store.select(fromStore.selectIsLoggedIn).pipe(take(1));
  }
}
