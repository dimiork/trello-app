import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from './state';
import { CheckLogin } from './auth/state/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = 'trello-app';

  constructor(private store$: Store<fromStore.State>) {}

  ngOnInit(): void {
    this.store$.dispatch(new CheckLogin());
  }
}
