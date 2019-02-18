import { Component, Input, ElementRef, EventEmitter } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as ListActions from '../../store/list/actions';
import { ListService } from '../../services/list.service';

// import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

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
  // modal: BsModalRef;

  constructor(
    // private listService: ListService,
    private store: Store<List[]>,
    // private modalService: BsModalService
  ) {}

  get id(): string {
    return this.list.id;
  }

  get title(): string {
    return this.list.title;
  }

  get items(): Item[] {
    return this.list.items;
  }

  // openModalWithComponent(item: Item): void {
  //   const initialState: EditItemModal = {
  //     listId: this.list.id,
  //     item: item
  //   };
  //   this.modal = this.modalService.show(ItemComponent, { initialState });
  // }

  updateList(): void {
    this.store.dispatch(new ListActions.Update(this.list));
    // this.listService.updateList(this.list);
  }

  removeList(): void {
    this.store.dispatch(new ListActions.Remove(this.list.id));
    // this.listService.removeList(this.list);
  }

  toggleAddItemDialog(): void {
    this.addItemDialog = !this.addItemDialog;
  }

  addItem(title: string, description?: string): void {
    if (title) {
      const newItem: Item = { title, description };
      // this.listService.addItem(this.list.id, newItem);
      this.toggleAddItemDialog();
    }
  }
}
