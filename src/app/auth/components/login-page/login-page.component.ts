import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromAuth from '../../state/auth.actions';
import * as fromRoot from '../../../state';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  constructor(
    private store: Store<fromRoot.State>,
    private authService: AuthService,
    private api: ApiService,
    private router: Router,
  ) {}

  signIn(username: string, password: string): void {
    // const {username, password} = this.signInForm.value;
    this.store.dispatch(new fromAuth.Login({ credentials: { username, password } }));
    // this.api.signin(username, password).subscribe((response: any) => {
    //   if (response.status === 'success') {
    //     this.authService.storeToken(response.result.token);
    //     this.authService.storeUser(response.result.user);
    //     this.router.navigate(['/tasks']);
    //   } else {
    //     console.log(response);
    //   }
    // });
  }

  signUp(username: string, password: string): void {
    // const {username, password} = this.signInForm.value;
    this.store.dispatch(new fromAuth.Signup({ credentials: { username, password } }));
    // this.api.signup(username, password).subscribe((response: any) => {
    //   if (response.status === 'success') {
    //     this.authService.storeToken(response.result.token);
    //     this.authService.storeUser(response.result);
    //     this.router.navigate(['/tasks']);
    //   } else {
    //     console.log(response);
    //   }
    // });
  }

}
