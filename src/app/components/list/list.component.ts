import { Component, /*OnInit,*/ Input } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as ListActions from '../../store/list/actions';

import { List } from '../../models/list';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent /*implements OnInit*/ {

  @Input() public list: List;

  public addItemDialog: boolean = false;

  constructor(private store: Store<List[]>) {}

  public removeList(id: string): void {
    this.store.dispatch(new ListActions.Remove(id));
  }

  public toggleAddItemDialog(): void {
    this.addItemDialog = !this.addItemDialog;
  }

  public addItem(title: string, description?: string): void {
    if(title) {
      this.store.dispatch(new ListActions.AddItem(this.list.id, { title: title, description: description }));
      this.toggleAddItemDialog();
    }
  }

  public updateListTitle(id: string, title: string): void {
    // this.store.dispatch(new ListActions.Update(id, title));
    this.store.dispatch(new ListActions.Update(this.list));
  }

  onDragStart(e) {
    console.log(this.list.title, 'drag start', e);
  }

  onDrag(e) {
    console.log(this.list.title, 'drag', e);
  }

  onDragOver(e) {
    console.log(this.list.title, 'drag over', e);
  }

  onDrop(e) {
    console.log(this.list.title, 'drop', e);
    console.log(this.list);

  }

  onDragEnd(e) {
    console.log(this.list.title, 'drag end', e);
  }

  updateList(): void {
    this.store.dispatch(new ListActions.Update(this.list));
  }

  /*ngOnInit() {
  }*/

}
