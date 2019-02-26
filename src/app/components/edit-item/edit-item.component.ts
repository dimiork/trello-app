import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';

import { Store, select } from '@ngrx/store';
import * as ItemActions from '../../store/actions/item';

import { Item } from '../../models';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent {

  item: Item;
  updateDescriptionDialog: boolean = false;
  updateTitleDialog: boolean = false;

  constructor(
    public store: Store<Item[]>,
    @Inject(MAT_DIALOG_DATA) public data: Item) {
    this.item = data;
  }

  toggleUpdateDescriptionDialog(): void {
    this.updateDescriptionDialog = !this.updateDescriptionDialog;
  }

  toggleUpdateTitleDialog(): void {
    this.updateTitleDialog = !this.updateTitleDialog;
  }

  updateTitle(title?: string): void {
    if (title) {
      this.item.title = title;
      this.updateItem(this.item);
      this.toggleUpdateTitleDialog();
    }
  }

  updateDescription(description?: string): void {
    this.item.description = description;
    this.updateItem(this.item);
    this.toggleUpdateDescriptionDialog();
  }

  updateItem(item: Item): void {
    this.store.dispatch(new ItemActions.Update({ item }));
  }

  removeItem(id: string): void {
    this.store.dispatch(new ItemActions.Remove({ id: this.item.id }));
  }

}
