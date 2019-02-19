import { Component, Input, ElementRef, EventEmitter } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as ListActions from '../../store/list/actions';
import { ListService } from '../../services/list.service';

import { ItemComponent } from '../item/item.component';
import { Item, EditItemModal, List } from '../../models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  @Input() list: List;
  addItemDialog: boolean = false;

  constructor(private store: Store<List[]>) {}

  get id(): string {
    return this.list.id;
  }

  get title(): string {
    return this.list.title;
  }

  get items(): Item[] {
    return this.list.items;
  }

  updateList(): void {
    this.store.dispatch(new ListActions.Update(this.list));
  }

  removeList(): void {
    this.store.dispatch(new ListActions.Remove(this.list.id));
  }

  toggleAddItemDialog(): void {
    this.addItemDialog = !this.addItemDialog;
  }

  addItem(title: string, description?: string): void {
    this.items.push({ title, description });
    this.updateList();
  }

  onDragStart(evt, data): void {
    // evt.preventDefault();
    // this.updateList();
    console.log("onDragStart", evt);
    // evt.dataTransfer.effectAllowed = 'move';
    // evt.dataDtransfer.setData('text', JSON.stringify(data));
    // this.store.dispatch(new DndActions.DragStart(evt));
  }

  onDragLeave(evt): void {
    // evt.preventDefault();
    // this.updateList();
    console.log("onDragLeave", evt);
    
  }

  onDrop(evt): void {
    console.log("onDrop", evt);
    const { listId, item } = evt;
    this.store.dispatch(new ListActions.RemoveItem({ listId: listId, item: item }));
    // this.store.dispatch(new ListActions.AddItemSuccess({ listId: this.listId, item: item }));
  }

}
