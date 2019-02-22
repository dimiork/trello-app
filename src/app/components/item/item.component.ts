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

  @Output() updateTitleEvent: EventEmitter<string> = new EventEmitter();
  @Output() updateDescrEvent: EventEmitter<string> = new EventEmitter();

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
    // if (title) {
    //   const newItem: Item = { ...this.item, title };
    //   this.update.emit(newItem);
    //   this.toggleUpdateTitleDialog();
    // }
    this.updateTitleEvent.emit(title);
  }

  updateDescription(description?: string): void {
    // if (description) {
    //   const newItem: Item = { ...this.item, description };
    //   this.update.emit(newItem);
    //   this.toggleUpdateDescriptionDialog();
    // }
    this.updateDescrEvent.emit(description);
  }

  removeItem(): void {
    // this.remove.emit(this.item);
  }

  onMove(evt: DragEvent): void {
    this.move.emit({ evt, item: this.item });
  }
}
