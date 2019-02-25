import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import * as ListActions from '../../store/actions/list';
import * as ItemActions from '../../store/actions/item';
import { selectAllItems } from '../../store/selectors/item';
import { Item, List } from '../../models';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  lists$: Observable<List[]> = this.store.pipe(select('lists'));
  // items$: Observable<Item[]> = this.store.pipe(select('items'));
  items$: Observable<Item[]> = this.store.pipe(select(selectAllItems));

  addListDialog: boolean = false;

  constructor(private store: Store<List[] | Item[]>) {}

  ngOnInit(): void {
    this.store.dispatch(new ListActions.Load());
    this.store.dispatch(new ItemActions.Load());
  }

  addList(title: string): void {
    this.store.dispatch(new ListActions.Add(title));
    this.toggleAddListDialog();
  }

  onUpdateListTitle(list: List): void {
    this.store.dispatch(new ListActions.Update(list));
  }

  onRemoveList(id: string): void {
    this.store.dispatch(new ListActions.Remove(id ));
  }

  onAddItem(item: Item): void {
    this.store.dispatch(new ItemActions.Add({ item }));
  }

  toggleAddListDialog(): void {
    this.addListDialog = !this.addListDialog;
  }

  trackByFn(index: number, item: List): string | number {
    return item.id;
  }
}
