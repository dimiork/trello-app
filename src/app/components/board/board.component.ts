import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { ListService } from '../../services/list.service';

import { List } from '../../models';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {

  public lists$: Observable<List[]>;
  public addListDialog: boolean = false;

  constructor(
    private listService: ListService,
  ) {
    this.lists$ = this.listService.getLists();
  }

  public toggleAddListDialog(): void {
    this.addListDialog = !this.addListDialog;
  }

  public addList(title: string): void {
    if (title) {
      this.listService.createList(title);
      this.toggleAddListDialog();
    }
  }
}
