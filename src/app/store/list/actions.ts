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
  // tslint:disable
  readonly type = ActionTypes.LOAD;
  // tslint:enable

  constructor(public lists: List[]) {}
}

export class Add implements Action {
  // tslint:disable
  readonly type = ActionTypes.ADD;
  // tslint:enable
  public items: Item[];

  constructor(
    public id: number = Math.random(),
    public title: string = 'New List'
  ) {
    this.items = [];
  }
}

export class Remove implements Action {
  // tslint:disable
  readonly type = ActionTypes.REMOVE;
  // tslint:enable
  constructor(public id: number) {}
}

export class Clear implements Action {
  // tslint:disable
  readonly type = ActionTypes.CLEAR;
  // tslint:enable
}

export type ListActionType = Load | Add | Remove | Clear;
