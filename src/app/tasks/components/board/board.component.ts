import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as ListActions from '../../state/actions/list';
import * as ItemActions from '../../state/actions/item';
// import { getAllItems } from '../../state/reducers';
// import { getAllLists } from '../../state/reducers';
import * as fromTasks from '../../state/reducers';
import { Item, List } from '../../models';

import { MatDialog } from '@angular/material';
import { EditItemComponent } from '../../components/edit-item/edit-item.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {

  lists$: Observable<List[]> = this.store.pipe(select(fromTasks.listsArray));
  items$: Observable<Item[]> = this.store.pipe(select(fromTasks.itemsArray));

  addListDialog: boolean = false;

  constructor(
    private store: Store<fromTasks.State>,
    private modal: MatDialog,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new ListActions.Load());
    this.store.dispatch(new ItemActions.Load());
  }

  addList(title: string): void {
    const list: List = { title: title.trim() };
    this.store.dispatch(new ListActions.Add({ list }));
    this.toggleAddListDialog();
  }

  onUpdateListTitle(list: List): void {
    this.store.dispatch(new ListActions.Update({ list }));
  }

  onRemoveList(id: string): void {
    this.store.dispatch(new ListActions.Remove({ id }));
  }

  onAddItem(item: Item): void {
    this.store.dispatch(new ItemActions.Add({ item }));
  }

  onUpdateItem(item: Item): void {
    this.store.dispatch(new ItemActions.Update({ item: item }));
  }

  onOpenItem(item: Item): void {
    this.store.dispatch(new ItemActions.Select({ item }));
    // TODO: should be placed inside ngrx/effect as a success result of select action?
    this.modal.open(EditItemComponent, {
      panelClass: 'edit-item-dialog-container',
    });
  }

  toggleAddListDialog(): void {
    this.addListDialog = !this.addListDialog;
  }

  trackByFn(index: number, item: List): string {
    return item.id;
  }
}
