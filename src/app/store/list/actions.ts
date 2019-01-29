import { Action } from '@ngrx/store';

import { List } from '../../models/list';
import { Item } from '../../models/item';

export enum ActionTypes {
  LOAD = '[LISTS] LOAD',
  ADD = '[LIST] ADD',
  UPDATE = '[LIST] UPDATE',
  REMOVE = '[LIST] REMOVE',
  CLEAR = '[LIST] CLEAR',
  ADD_ITEM = '[LIST] ADD_ITEM',
  UPDATE_ITEM = '[LIST] UPDATE_ITEM',
  REMOVE_ITEM = '[LIST] REMOVE_ITEM',
}

export class Load implements Action {
  // tslint:disable
  readonly type = ActionTypes.LOAD;
  // tslint:enable

  constructor(public lists: List[]) {}
}

export class Add implements Action {
  // tslint:disable
  readonly type = ActionTypes.ADD;
  // tslint:enable
  public id: string = Math.random().toString(26).slice(2);
  public items: Item[];

  constructor(
    public title: string = 'New List'
  ) {
    this.items = [];
  }
}

export class Update implements Action {
  // tslint:disable
  readonly type = ActionTypes.UPDATE;
  // tslint:enable
  constructor(
    public list: List
  ) {}
}

export class Remove implements Action {
  // tslint:disable
  readonly type = ActionTypes.REMOVE;
  // tslint:enable
  constructor(public id: string) {}
}

export class Clear implements Action {
  // tslint:disable
  readonly type = ActionTypes.CLEAR;
  // tslint:enable
}

export class AddItem implements Action {
  // tslint:disable
  readonly type = ActionTypes.ADD_ITEM;
  // tslint:enable
  public id: string = Math.random().toString(26).slice(2);
  constructor(
    public listId: string,
    public item: Item
  ) {}
}

export class UpdateItem implements Action {
  // tslint:disable
  readonly type = ActionTypes.UPDATE_ITEM;
  // tslint:enable
  constructor(
    public listId: string,
    public item: Item
  ) {}
}

export class RemoveItem implements Action {
  // tslint:disable
  readonly type = ActionTypes.REMOVE_ITEM;
  // tslint:enable
  constructor(
    public listId: string,
    public id: string
  ) {}
}

export type ListActionType = Load | Add | Update | Remove | Clear | AddItem | UpdateItem | RemoveItem;
