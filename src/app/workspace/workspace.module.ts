import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';
import { WorkspaceRoutingModule } from './workspace-routing.module';
import { MainComponent } from './components/main/main.component';
import { BoardListComponent } from './components/board-list/board-list.component';

@NgModule({
  declarations: [MainComponent, BoardListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    WorkspaceRoutingModule
  ]
})
export class WorkspaceModule { }
