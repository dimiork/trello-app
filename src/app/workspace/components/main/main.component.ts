import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../state';
import { Logout } from '../../../auth/state/auth.actions';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  constructor(private store$: Store<fromRoot.State>) {}

  logout(): void {
    this.store$.dispatch(new Logout());
  }

}
