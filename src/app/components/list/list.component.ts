import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Item, List } from '../../models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {

  @Input() list: List;
  @Input() items: Item[];

  @Output() updateTitleEvent: EventEmitter<List> = new EventEmitter();
  @Output() removeEvent: EventEmitter<string | number> = new EventEmitter();

  @Output() addItemEvent: EventEmitter<Item> = new EventEmitter();
  @Output() removeItemEvent: EventEmitter<string | number> = new EventEmitter();

  // @Output() updateItemTitleEvent: EventEmitter<string> = new EventEmitter();
  // @Output() updateItemDescriptionEvent: EventEmitter<string> = new EventEmitter();

  private addItemDialog: boolean = false;
  private updateTitleDialog: boolean = false;
  private _insertionIndex: number = -1;

  get id(): string {
    return this.list.id;
  }

  updateTitle(title: string): void {
    this.updateTitleEvent.emit({ id: this.id, title });
  }

  remove(): void {
    this.removeEvent.emit(this.id);
  }

  addItem(title?: string, description?: string): void {
    const trimedTitle: string = title.trim();
    const item: Item = { listId: this.id, title: trimedTitle, description };
    this.addItemEvent.emit(item);
  }

  // onUpdateItemTitle(title: string): void {
  //   this.updateItemTitleEvent.emit(title);
  // }

  // onUpdateItemDescr(description: string): void {
  //   this.updateItemDescriptionEvent.emit(description);
  // }

  // onRemoveItem(id: string | number): void {
  //   this.removeItemEvent.emit(id);
  // }

  toggleAddItemDialog(): void {
    this.addItemDialog = !this.addItemDialog;
  }

  trackByFn(index: number, item: Item): string {
    return item.id;
  }
}
