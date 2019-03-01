import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BoardComponent } from './board/board.component';
import { ListComponent } from './list/list.component';
import { ItemComponent } from './item/item.component';
import { EditItemComponent } from './edit-item/edit-item.component';

import { PipesModule } from '../pipes/index';
import { MaterialModule } from '../../material.module';

export const COMPONENTS = [
  EditItemComponent,
  ItemComponent,
  ListComponent,
  BoardComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    PipesModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  entryComponents: [EditItemComponent],
})
export class ComponentsModule {}
