import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as ListActions from '../../store/actions/list';
import { ListService } from '../../services/list.service';

import { ItemComponent } from '../item/item.component';
import { Item, List, ServiceItem } from '../../models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {

  @Input() list: List;

  @Output() updateTitleEvent: EventEmitter<List> = new EventEmitter();
  @Output() removeEvent: EventEmitter<string | number> = new EventEmitter();

  @Output() addItemEvent: EventEmitter<Item> = new EventEmitter();
  // @Output() removeItemEvent: EventEmitter<string | number> = new EventEmitter();

  // @Output() updateItemTitleEvent: EventEmitter<string> = new EventEmitter();
  // @Output() updateItemDescriptionEvent: EventEmitter<string> = new EventEmitter();

  private addItemDialog: boolean = false;
  private updateTitleDialog: boolean = false;
  private _insertionIndex: number = -1;

  get id(): string | number {
    return this.list.id;
  }

  get title(): string {
    return this.list.title;
  }

  // get items(): Item[] {
  //   return this.list.items;
  // }

  // get insertionIndex(): number {
  //   return this._insertionIndex >= 0 ? this._insertionIndex : this.items.length;
  // }

  updateTitle(title: string): void {
    this.updateTitleEvent.emit({ id: this.id, title });
  }

  remove(): void {
    this.removeEvent.emit(this.id);
  }

  addItem(title?: string, description?: string): void {
    const item: Item = { title, description };
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

  onMoveItem(data: { evt: DragEvent, item: Item}): void {
    data.evt.dataTransfer.setData('data', JSON.stringify({ listId: this.id, item: data.item }));
  }

  toggleAddItemDialog(): void {
    this.addItemDialog = !this.addItemDialog;
  }

  canDrop(evt: DragEvent): void {
    evt.preventDefault();
  }

  getDropIndex(evt: DragEvent, i: number): void {
    evt.preventDefault();
    this._insertionIndex = i;
  }

  onDrop(evt: DragEvent): void {
    evt.preventDefault();
    const data: ServiceItem = JSON.parse(evt.dataTransfer.getData('data'));
    // this.store.dispatch(new ListActions.RemoveItem({ listId: data.listId, item: data.item }));
    this.addItem(data.item.title, data.item.description);
  }

  trackByFn(index: number, item: Item): string | number {
    return item.id;
  }
}
