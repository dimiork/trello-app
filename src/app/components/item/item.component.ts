import { Component, Input } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as ListActions from '../../store/list/actions';

import { BsModalRef } from 'ngx-bootstrap/modal';

import { Item, List } from '../../models';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {

  public closeBtnName: string;
  public listId: string;
  public item: Item;
  public updateDescriptionDialog: boolean = false;
  public updateTitleDialog: boolean = false;

  constructor(
    private store: Store<List[]>,
    public bsModalRef: BsModalRef
  ) {}

  public toggleUpdateDescriptionDialog(): void {
    this.updateDescriptionDialog = !this.updateDescriptionDialog;
  }

  public toggleUpdateTitleDialog(): void {
    this.updateTitleDialog = !this.updateTitleDialog;
  }

  public updateTitle(title: string): void {
    if (title) {
      const newItem: Item = { ...this.item, title };
      this.updateItem(newItem);
      this.toggleUpdateTitleDialog();
    }
  }

  public updateDescription(description: string): void {
    if (description) {
      const newItem: Item = { ...this.item, description };
      this.updateItem(newItem);
      this.toggleUpdateDescriptionDialog();
    }
  }

  public updateItem(item: Item): void {
    this.item = item;
    this.store.dispatch(new ListActions.UpdateItem(this.listId, item));
  }

  public removeItem(id: string): void {
    this.store.dispatch(new ListActions.RemoveItem(this.listId, id));
    this.bsModalRef.hide();
  }
}
