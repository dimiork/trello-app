import { Component, Input, ElementRef, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

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
  addItemDialog: boolean = false;
  updateTitleDialog: boolean = false;
  _insertionIndex: number = -1;

  constructor(private store: Store<List[]>) {}

  get id(): string | number {
    return this.list.id;
  }

  get title(): string {
    return this.list.title;
  }

  get items(): Item[] {
    return this.list.items;
  }

  get insertionIndex(): number {
    return this._insertionIndex >= 0 ? this._insertionIndex : this.items.length;
  }

  updateList(): void {
    this.store.dispatch(new ListActions.Update({ list: this.list }));
  }

  removeList(): void {
    this.store.dispatch(new ListActions.Remove({ id: this.id }));
  }

  toggleAddItemDialog(): void {
    this.addItemDialog = !this.addItemDialog;
  }

  addItem(title?: string, description?: string): void {
    if (title) {
      this.store.dispatch(new ListActions.AddItem({
        listId: this.id,
        item: { title, description },
        insertionIndex: this.insertionIndex
      }));
    }
  }

  onUpdateItem(item: Item): void {
    const list: List = {
      ...this.list,
      items: this.items.map((currentItem: Item) => currentItem.id === item.id ? item : currentItem )
    };
    this.store.dispatch(new ListActions.Update({ list }));
  }

  onMoveItem(data: { evt: DragEvent, item: Item}): void {
    data.evt.dataTransfer.setData('data', JSON.stringify({ listId: this.id, item: data.item }));
  }

  onRemoveItem(item: Item): void {
    const list: List = {
      ...this.list,
      items: this.items.filter((currentItem: Item) =>
        currentItem.id !== item.id)
    };
    this.store.dispatch(new ListActions.Update({ list }));
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
    this.store.dispatch(new ListActions.RemoveItem({ listId: data.listId, item: data.item }));
    this.addItem(data.item.title, data.item.description);
  }

  trackByFn(index: number, item: Item): string | number {
    return item.id;
  }
}
