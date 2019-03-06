import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromRoot from './state';
import { CheckAuth } from './auth/state/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = 'trello-app';
  isLoggedIn$: Observable<boolean> = this.store$.pipe(select(fromRoot.selectIsLoggedIn));
  isLoading$: Observable<boolean> = this.store$.pipe(select(fromRoot.selectIsLoading));

  constructor(
    private store$: Store<fromRoot.State>,
  ) {}

  ngOnInit(): void {
    this.store$.dispatch(new CheckAuth());
  }
}
