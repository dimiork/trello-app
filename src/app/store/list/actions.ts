import { Action } from '@ngrx/store';

import { List } from '../../models/list';
import { Item } from '../../models/item';

export enum ActionTypes {
  LOAD = '[LISTS] LOAD',
  ADD = '[LIST] ADD',
  UPDATE = '[LIST] UPDATE',
  REMOVE = '[LIST] REMOVE',
  CLEAR = '[LIST] CLEAR',
}

export class Load implements Action {
  readonly type = ActionTypes.LOAD;

  constructor(public lists: List[]) {}
}

export class Add implements Action {
  readonly type = ActionTypes.ADD;

  public id: number;
  public items: Item[];

  constructor(public title: string = 'New List') {
    this.id = Math.random();
    this.items = [];
  }
}

export class Remove implements Action {
  readonly type = ActionTypes.REMOVE;

  constructor(public id: number) {}
}

export class Clear implements Action {
  readonly type = ActionTypes.CLEAR;
}

export type ListActionType = Load | Add | Remove | Clear;
