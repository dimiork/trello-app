import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as ListActions from '../../store/list/actions';

import { ListService } from '../../services/list.service';

import { Item, List, ServiceItem } from '../../models';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent {

  @Input() item: Item;
  @Input() listId: string;
  @Output() updateItem: EventEmitter<Item> = new EventEmitter();

  public updateDescriptionDialog: boolean = false;
  public updateTitleDialog: boolean = false;

  constructor(private store: Store<List[]>) {}

  public toggleUpdateDescriptionDialog(): void {
    this.updateDescriptionDialog = !this.updateDescriptionDialog;
  }

  public toggleUpdateTitleDialog(): void {
    this.updateTitleDialog = !this.updateTitleDialog;
  }

  public updateTitle(title?: string): void {
    if (title) {
      const newItem: Item = { ...this.item, title };
      this.updateItem.emit(newItem);
      this.toggleUpdateTitleDialog();
    }
  }

  public updateDescription(description?: string): void {
    if (description) {
      const newItem: Item = { ...this.item, description };
      this.updateItem.emit(newItem);
      this.toggleUpdateDescriptionDialog();
    }
  }

  public removeItem(): void {
    this.store.dispatch(new ListActions.RemoveItem({ listId: this.listId, item: this.item }));
  }

  onDragStart(evt: DragEvent): void {
    evt.dataTransfer.effectAllowed = 'move';
    evt.dataTransfer.setData('data', JSON.stringify({ listId: this.listId, item: this.item }));
  }
}
