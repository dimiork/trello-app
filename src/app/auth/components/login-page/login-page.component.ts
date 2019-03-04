import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromAuth from '../../state/auth.actions';
import * as fromRoot from '../../../state';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  constructor(
    private store: Store<fromRoot.State>,
    private authService: AuthService
  ) {}

  doLogin(username: string, password: string): void {
    this.store.dispatch(new fromAuth.Login({ username, password }))
  }

}
