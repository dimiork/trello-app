import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: LoginPageComponent },
    ])
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
