import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Item, List } from '../../models';

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

  updateTitle(title?: string): void {
    this.updateTitleEvent.emit(title);
  }

  updateDescription(description?: string): void {
    this.updateDescrEvent.emit(description);
  }

  toggleUpdateDescriptionDialog(): void {
    this.updateDescriptionDialog = !this.updateDescriptionDialog;
  }

  toggleUpdateTitleDialog(): void {
    this.updateTitleDialog = !this.updateTitleDialog;
  }

  onMove(evt: DragEvent): void {
    this.move.emit({ evt, item: this.item });
  }
}
