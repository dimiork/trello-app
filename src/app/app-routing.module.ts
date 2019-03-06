import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StartPageComponent } from './components/start-page/start-page.component';
import { AuthGuard } from './auth/services/auth.guard';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: StartPageComponent },
      {
        path: 'workspace',
        loadChildren: './workspace/workspace.module#WorkspaceModule',
        canActivate: [AuthGuard],
      },
      // { path: 'tasks',
      //   loadChildren: './tasks/tasks.module#TasksModule',
      //   canActivate: [AuthGuard],
      // },
      { path: 'login',
        loadChildren: './auth/auth.module#AuthModule',
      }
    ]),
  ],
  providers: [AuthGuard],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
