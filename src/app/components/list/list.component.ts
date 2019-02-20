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
  isDropItemAreaActive: boolean = false;

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
    this.store.dispatch(new ListActions.AddItem({ listId: this.id, item: { title, description } }));
  }

  onDragStart(evt): void {
    // evt.preventDefault();
    console.log("onDragStart", evt);
    const data = JSON.parse(evt.dataTransfer.getData('data'));
    console.log(data);
    // evt.dataTransfer.effectAllowed = 'move';
  }

  onDragover(evt): void {
    evt.preventDefault();
    console.log('[ DRAG OVER]', evt);
  }

  onDrop(evt): void {
    evt.preventDefault();
    const data = JSON.parse(evt.dataTransfer.getData("data"));
    console.log("onDrop", evt);
    console.log(data);
    // const { listId, item } = evt;
    this.store.dispatch(new ListActions.RemoveItemSuccess({ listId: data.listId, item: data.item }));
    this.addItem(data.item.title, data.item.description);
    // this.store.dispatch(new ListActions.AddItemSuccess({ listId: this.id, item: data.item }));
  }
}
