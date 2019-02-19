import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';

import { Store, select } from '@ngrx/store';

import { ListService } from '../../services/list.service';

import { List } from '../../models';

import * as ListActions from '../../store/list/actions';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  public lists$ = this.store.pipe(select('lists'));
  public addListDialog: boolean = false;

  constructor(
    private store: Store<List[]>,
    private listService: ListService,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new ListActions.Load());
  }

  public toggleAddListDialog(): void {
    this.addListDialog = !this.addListDialog;
  }

  public addList(title: string): void {
    this.store.dispatch(new ListActions.Add(title));
    this.toggleAddListDialog();
  }
}
