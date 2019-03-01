import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './services/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'login', component: LoginPageComponent },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
      }
    ])
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
