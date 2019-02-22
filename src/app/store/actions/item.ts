import { Action } from '@ngrx/store';
import { Item } from '../../models';

export enum ActionTypes {
  Load = '[ITEM] LOAD',
  LoadSuccess = '[ITEM] LOADED_SUCCESS',
  Add = '[ITEM] ADD',
  AddSuccess = '[ITEM] ADD_SUCCESS',
  Update = '[ITEM] UPDATE',
  UpdateSuccess = '[ITEM] UPDATE_SUCCESS',
  Remove = '[ITEM] REMOVE',
  RemoveSuccess = '[ITEM] REMOVE_SUCCESS',
}

export class Load implements Action {
  readonly type: ActionTypes.Load = ActionTypes.Load;
  constructor(public payload?: Item[] | null) {}
}

export class LoadSuccess implements Action {
  readonly type: ActionTypes.LoadSuccess = ActionTypes.LoadSuccess;
  constructor(public payload: Item[]) {}
}

export class Add implements Action {
  readonly type: ActionTypes.Add = ActionTypes.Add;
  constructor(public payload: string) {}
}

export class AddSuccess implements Action {
  readonly type: ActionTypes.AddSuccess = ActionTypes.AddSuccess;
  constructor(public payload: Item) {}
}

export class Update implements Action {
  readonly type: ActionTypes.Update = ActionTypes.Update;
  constructor(public payload: Item) {}
}

export class UpdateSuccess implements Action {
  readonly type: ActionTypes.UpdateSuccess = ActionTypes.UpdateSuccess;
  constructor(public payload: Item) {}
}

export class Remove implements Action {
  readonly type: ActionTypes.Remove = ActionTypes.Remove;
  constructor(public payload: string | number ) {}
}

export class RemoveSuccess implements Action {
  readonly type: ActionTypes.RemoveSuccess = ActionTypes.RemoveSuccess;
  constructor(public payload: string | number) {}
}

export type ActionsUnion
  = Load
  | LoadSuccess
  | Add
  | AddSuccess
  | Update
  | UpdateSuccess
  | Remove
  | RemoveSuccess;
