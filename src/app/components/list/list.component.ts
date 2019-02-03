import { Component, Input, ElementRef } from '@angular/core';

import { ListService } from '../../services/list.service';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { ItemComponent } from '../item/item.component';
import { Item, EditItemModal, List } from '../../models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  @Input() public list: List;
  public addItemDialog: boolean = false;
  public modal: BsModalRef;

  constructor(
    private listService: ListService,
    private modalService: BsModalService
  ) {}

  openModalWithComponent(item: Item): void {
    const initialState: EditItemModal = {
      listId: this.list.id,
      item: item
    };
    this.modal = this.modalService.show(ItemComponent, { initialState });
  }

  public updateList(): void {
    this.listService.updateList(this.list);
  }

  public removeList(): void {
    this.listService.removeList(this.list.id);
  }

  public toggleAddItemDialog(): void {
    this.addItemDialog = !this.addItemDialog;
  }

  public addItem(title: string, description?: string): void {
    if (title) {
      const newItem: Item = { title, description };
      this.listService.addItem(this.list.id, newItem);
      this.toggleAddItemDialog();
    }
  }
}
