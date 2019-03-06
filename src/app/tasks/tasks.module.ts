import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ComponentsModule } from './components';
import { MaterialModule } from '../material.module';

import { reducers } from './state/reducers';
import { ListEffects, ItemEffects } from './state/effects';
import { BoardComponent } from './components/board/board.component';
import { AuthGuard } from '../auth/services/auth.guard';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ComponentsModule,
    RouterModule.forChild([{
      path: '',
      component: BoardComponent,
      canActivate: [AuthGuard]
    }]),
    StoreModule.forFeature('tasks', reducers),
    EffectsModule.forFeature([ListEffects, ItemEffects])
  ],
  providers: [AuthGuard],
})
export class TasksModule {}
