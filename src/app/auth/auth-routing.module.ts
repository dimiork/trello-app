import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { AuthGuard } from './services/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: LoginPageComponent },
      {
        path: 'user',
        component: UserPageComponent,
        canActivate: [AuthGuard]
      }
    ])
  ],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
