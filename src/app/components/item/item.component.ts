import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as ListActions from '../../store/actions/list';

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

  @Output() update: EventEmitter<Item> = new EventEmitter();
  @Output() remove: EventEmitter<Item> = new EventEmitter();
  @Output() move: EventEmitter<{ evt: DragEvent, item: Item }> = new EventEmitter();

  updateDescriptionDialog: boolean = false;
  updateTitleDialog: boolean = false;

  constructor(private store: Store<List[]>) {}

  toggleUpdateDescriptionDialog(): void {
    this.updateDescriptionDialog = !this.updateDescriptionDialog;
  }

  toggleUpdateTitleDialog(): void {
    this.updateTitleDialog = !this.updateTitleDialog;
  }

  updateTitle(title?: string): void {
    if (title) {
      const newItem: Item = { ...this.item, title };
      this.update.emit(newItem);
      this.toggleUpdateTitleDialog();
    }
  }

  updateDescription(description?: string): void {
    if (description) {
      const newItem: Item = { ...this.item, description };
      this.update.emit(newItem);
      this.toggleUpdateDescriptionDialog();
    }
  }

  removeItem(): void {
    this.remove.emit(this.item);
  }

  onMove(evt: DragEvent): void {
    this.move.emit({ evt, item: this.item });
  }
}
