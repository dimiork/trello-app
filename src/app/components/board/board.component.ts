import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { Store, select } from '@ngrx/store';
import * as ListActions from '../../store/list/actions';

import { LocalstorageService } from '../../services/localstorage.service';
import { List } from '../../models/list';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  public lists$: Observable<List[]>;
  public addListDialog: boolean = false;

  constructor(
    private localstorage: LocalstorageService,
    private store: Store<List[]>
  ) {
    this.lists$ = store.pipe(select('lists'));
  }

  ngOnInit(): void {
    this.loadLists();
    this.updateLists();
  }

  public loadLists(): void {
    const lists: List[] = this.localstorage.load();
    this.store.dispatch(new ListActions.Load(lists));
  }

  public updateLists(): void {
    this.store.select('lists')
      .subscribe((lists: List[]) => {
        this.localstorage.save(lists);
      });
  }

  toggleAddListDialog(): void {
    this.addListDialog = !this.addListDialog;
  }

  addList(title: string): void {
    // TODO: refactor this without subscription. Move id generation logic in ngrx/effects
    this.lists$.pipe(
      take(1),
      map((lists: List[]) => lists.length + 1)
    ).subscribe((id: number) => {
      this.store.dispatch(new ListActions.Add(id, title));
    });
  }
}
