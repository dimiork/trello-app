import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatDialogModule,
    DragDropModule,
    MatMenuModule,
  ],
  exports: [
    MatDialogModule,
    DragDropModule,
    MatMenuModule,
    MatIconModule,
  ]
})
export class MaterialModule { }
