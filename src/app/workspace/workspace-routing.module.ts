import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { BoardListComponent } from './components/board-list/board-list.component';
import { AuthGuard } from '../auth/services/auth.guard';

const routes: Routes = [
  {
      path: '',
      component: MainComponent,
      canActivate: [AuthGuard],
      children: [
          {
            path: '',
            component: BoardListComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'board',
            // path: 'board/:id',
            loadChildren: './tasks/tasks.module#TasksModule',
            canActivate: [AuthGuard],
          },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceRoutingModule { }
