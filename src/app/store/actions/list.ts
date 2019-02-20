import { Action } from '@ngrx/store';

import { List } from '../../models/list';
import { Item } from '../../models/item';
import { ServiceItem } from '../../models/';

export enum ActionTypes {
  Load = '[LISTS] LOAD',
  LoadSuccess = '[LISTS] LOADED_SUCCESS',
  Add = '[LIST] ADD',
  AddSuccess = '[LIST] ADD_SUCCESS',
  Update = '[LIST] UPDATE',
  UpdateSuccess = '[LIST] UPDATE_SUCCESS',
  Remove = '[LIST] REMOVE',
  RemoveSuccess = '[LIST] REMOVE_SUCCESS',
  AddItem = '[LIST] ADD_ITEM',
  AddItemSuccess = '[LIST] ADD_ITEM_SUCCESS',
  // UpdateItem = '[LIST] UPDATE_ITEM',
  RemoveItem = '[LIST] REMOVE_ITEM',
  RemoveItemSuccess = '[LIST] REMOVE_ITEM_SUCCESS',
  ErrorHandle = '[LIST] ERROR_HANDLED'
}

export class Load implements Action {
  readonly type: ActionTypes.Load = ActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type: ActionTypes.LoadSuccess = ActionTypes.LoadSuccess;

  constructor(public payload: { lists: List[] }) {}
}

export class Add implements Action {
  readonly type: ActionTypes.Add = ActionTypes.Add;

  constructor(public payload: { title: string }) {}
}

export class AddSuccess implements Action {
  readonly type: ActionTypes.AddSuccess = ActionTypes.AddSuccess;

  constructor(public payload: { list: List }) {}
}

export class Update implements Action {
  readonly type: ActionTypes.Update = ActionTypes.Update;

  constructor(public payload: { list: List }) {}
}

export class UpdateSuccess implements Action {
  readonly type: ActionTypes.UpdateSuccess = ActionTypes.UpdateSuccess;

  constructor(public payload: { list: List }) {}
}

export class Remove implements Action {
  readonly type: ActionTypes.Remove = ActionTypes.Remove;

  constructor(public payload: { id: string | number } ) {}
}

export class RemoveSuccess implements Action {
  readonly type: ActionTypes.RemoveSuccess = ActionTypes.RemoveSuccess;

  constructor(public payload: { id: string | number }) {}
}

export class AddItem implements Action {
  readonly type: ActionTypes.AddItem = ActionTypes.AddItem;

  constructor(public payload: ServiceItem) {}
}

export class AddItemSuccess implements Action {
  readonly type: ActionTypes.AddItemSuccess = ActionTypes.AddItemSuccess;

  constructor(public payload: ServiceItem) {}
}

export class RemoveItem implements Action {
  readonly type: ActionTypes.RemoveItem = ActionTypes.RemoveItem;

  constructor(public payload: ServiceItem) {}
}

export class RemoveItemSuccess implements Action {
  readonly type: ActionTypes.RemoveItemSuccess = ActionTypes.RemoveItemSuccess;

  constructor(public payload: ServiceItem) {}
}

export class ErrorHandle implements Action {
  readonly type: ActionTypes.ErrorHandle = ActionTypes.ErrorHandle;

  constructor(public payload: { error: Error }) {}
}

export type ActionsUnion
  = Load
  | LoadSuccess
  | Add
  | AddSuccess
  | Update
  | UpdateSuccess
  | Remove
  | RemoveSuccess
  | AddItem
  | AddItemSuccess
  | RemoveItem
  | RemoveItemSuccess
  | ErrorHandle;
