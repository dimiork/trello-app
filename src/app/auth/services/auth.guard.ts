import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { mergeMap, map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AuthService } from './auth.service';
import * as fromStore from '../../state';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private store: Store<fromStore.State>,
    private router: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    return this.checkStoreAuthentication().pipe(
      mergeMap((storeAuth: boolean) => {
        if (storeAuth) {
          return of(true);
        }

        return of(false);
        // return this.checkApiAuthentication();
      }),
      map((storeOrApiAuth: boolean) => {
        if (!storeOrApiAuth) {
          this.router.navigate(['/login']);

          return false;
        }

        return true;
      })
    );
  }

  checkStoreAuthentication(): Observable<boolean> {
    return this.store.select(fromStore.selectIsLoggedIn).pipe(take(1));
  }

  checkApiAuthentication(): Observable<boolean> {
    return of(this.authService.authenticated);
  }

}
