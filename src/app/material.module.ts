import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EditItemComponent } from './components/edit-item/edit-item.component';
import { ItemComponent } from './components/item/item.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatDialogModule,
    DragDropModule,
  ],
  entryComponents: [ItemComponent, EditItemComponent],
  exports: [
    MatDialogModule,
    DragDropModule,
  ]
})
export class MaterialModule { }
