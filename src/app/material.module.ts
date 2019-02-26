import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material';
import { EditItemComponent } from './components/edit-item/edit-item.component';
import { ItemComponent } from './components/item/item.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatDialogModule,
  ],
  entryComponents: [ItemComponent, EditItemComponent],
  exports: [
    MatDialogModule,
  ]
})
export class MaterialModule { }
