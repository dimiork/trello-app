import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ListService } from '../../services/list.service';

import { Item, List, EditItemModal } from '../../models';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {

  @Input() item: Item;
  @Input() listId: string;
  @Output() _dragStart = new EventEmitter();
  @Output() _dragLeave = new EventEmitter();
  @Output() _drop = new EventEmitter();

  public updateDescriptionDialog: boolean = false;
  public updateTitleDialog: boolean = false;

  constructor() {}

  public toggleUpdateDescriptionDialog(): void {
    this.updateDescriptionDialog = !this.updateDescriptionDialog;
  }

  public toggleUpdateTitleDialog(): void {
    this.updateTitleDialog = !this.updateTitleDialog;
  }

  // public updateTitle(title?: string): void {
  //   if (title) {
  //     const newItem: Item = { ...this.item, title };
  //     this.updateItem(newItem);
  //     this.toggleUpdateTitleDialog();
  //   }
  // }

  // public updateDescription(description?: string): void {
  //   if (description) {
  //     const newItem: Item = { ...this.item, description };
  //     this.updateItem(newItem);
  //     this.toggleUpdateDescriptionDialog();
  //   }
  // }

  // public updateItem(item: Item): void {
  //   this.item = item;
  //   // this.listService.updateItem(this.listId, item);
  // }

  // public removeItem(id: string): void {
  //   // this.listService.removeItem(this.listId, id);
  // }

  dragstart(evt): void {
    console.log("[DRAG START]" + this.item, this.listId);
    evt.dataTransfer.effectAllowed = 'move';
    evt.dataTransfer.setData('data', JSON.stringify({ listId: this.listId, item: this.item }));
    this._dragStart.emit(evt);
  }

  dragleave(evt): void {
    console.log("[DRAG LEAVE]" + this.item, this.listId);
    this._dragLeave.emit({ listId: this.listId, item: this.item });
  }

  // dragover(evt): void {
  //   console.log("[DRAG OVER]" + evt);
  // }

  // dragexit(evt): void {
  //   console.log("[DRAG EXIT]" + evt);
  // }

  drop(evt): void {
    const data = JSON.parse(evt.dataTransfer.getData('data'));
    console.log("[DROP]" + evt.dataTransfer.getData('data'));

    this._drop.emit({ listId: this.listId, item: this.item });
  }
}
