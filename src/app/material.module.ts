import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatDialogModule,
    DragDropModule,
    MatMenuModule,
    MatDividerModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
  ],
  exports: [
    MatDialogModule,
    DragDropModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
  ]
})
export class MaterialModule { }
