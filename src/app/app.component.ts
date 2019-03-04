import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromRoot from './state';
import { CheckLogin, Logout } from './auth/state/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = 'trello-app';
  isLoggedIn$: Observable<boolean> = this.store$.pipe(select(fromRoot.selectIsLoggedIn));

  constructor(private store$: Store<fromRoot.State>) {}

  logOut(): void {
    this.store$.dispatch(new Logout());
  }

  ngOnInit(): void {
    this.store$.dispatch(new CheckLogin());
  }
}
