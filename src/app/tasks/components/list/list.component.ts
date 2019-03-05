import { 
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

import { Item, List } from '../../models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {

  @Input() list: List;
  @Input() items: Item[];

  @Output() updateTitleEvent: EventEmitter<List> = new EventEmitter();
  @Output() removeEvent: EventEmitter<string> = new EventEmitter();

  @Output() addItemEvent: EventEmitter<Item> = new EventEmitter();
  @Output() updateItemEvent: EventEmitter<Item> = new EventEmitter();
  @Output() openItemEvent: EventEmitter<Item> = new EventEmitter();

  private addItemDialog: boolean = false;

  get id(): string {
    return this.list.id;
  }

  updateTitle(title: string): void {
    this.updateTitleEvent.emit({ id: this.id, title });
  }

  remove(): void {
    this.removeEvent.emit(this.id);
  }

  addItem(title: string, description?: string): void {
    const item: Item = { listId: this.id, title: title, description, _position: Math.floor(Math.random() * 999) + 0 };
    this.addItemEvent.emit(item);
  }

  openEditItem(item: Item): void {
    this.openItemEvent.emit(item);
  }

  toggleAddItemDialog(): void {
    this.addItemDialog = !this.addItemDialog;
  }

  generateSwappedItemPosition(event: CdkDragDrop<string[]>): number {
    const initialPosition: number = 1024;
    const idx: number = event.currentIndex;
    const prevIdx: number = event.previousIndex;
    const len: number = this.items.length;
    const prevItem: Item = this.items[idx - 1];
    const nextItem: Item = this.items[idx + 1];
    const currItem: Item = this.items[idx];
    const latestItem: Item = this.items[len - 1];
    const isLocalSwap: boolean = (event.previousContainer === event.container);

    if (idx === 0) {
      return currItem ? currItem['_position'] / 2 : initialPosition;
    }
    if (idx > (len - 1) ) {
      return latestItem['_position'] * 2;
    }
    if (isLocalSwap) {
      if (idx < prevIdx) {
        return ( currItem['_position'] + prevItem['_position'] ) / 2;
      }
      if (idx === (len - 1)) {
        return currItem['_position'] * 2;
      }

      return ( currItem['_position'] + nextItem['_position'] ) / 2;
    }

    return ( currItem['_position'] + prevItem['_position'] ) / 2;
  }

  onDrop(event: CdkDragDrop<string[]>): void {
    const position: number = this.generateSwappedItemPosition(event);
    const item: Item = { ...event.item.data, listId: this.id, _position: position };
    this.updateItemEvent.emit(item);
  }

  trackByFn(index: number, item: Item): string {
    return item.id;
  }
}
