import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RecoveryPageComponent } from './components/recovery-page/recovery-page.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: LoginPageComponent },
      {
        path: 'recovery',
        component: RecoveryPageComponent,
      }
    ])
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
