import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import * as ListActions from '../../store/actions/list';
import { Item, List } from '../../models';
import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  lists$: Observable<List[]> = this.store.pipe(select('lists'));
  addListDialog: boolean = false;

  constructor(
    private store: Store<List[]>,
    private listService: ListService,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new ListActions.Load());
  }

  toggleAddListDialog(): void {
    this.addListDialog = !this.addListDialog;
  }

  addList(title: string): void {
    this.store.dispatch(new ListActions.Add({ title }));
    this.toggleAddListDialog();
  }

  _trackByFn(index: number, item: Item): string | number {
    return item.id;
  }
}
