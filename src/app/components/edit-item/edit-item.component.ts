import { Component, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as ItemActions from '../../store/actions/item';
import { selectActiveItem } from '../../store/selectors/item';

import { Item } from '../../models';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnDestroy {

  item: Item;
  updateDescriptionDialog: boolean = false;
  updateTitleDialog: boolean = false;
  private subscription: Subscription;

  constructor(private store: Store<Item>) {
    this.subscription = this.store.pipe(select(selectActiveItem)).subscribe((selectedItem: Item) => {
      this.item = selectedItem;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
      this.store.dispatch(new ItemActions.Update({ item: this.item }));
      this.toggleUpdateTitleDialog();
    }
  }

  updateDescription(description?: string): void {
    this.item.description = description;
    this.store.dispatch(new ItemActions.Update({ item: this.item }));
    this.toggleUpdateDescriptionDialog();
  }

  removeItem(id: string): void {
    this.store.dispatch(new ItemActions.Remove({ id: this.item.id }));
  }

}
