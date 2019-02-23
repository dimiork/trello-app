import { Action } from '@ngrx/store';
import { Item, List } from '../../models';

export enum ActionTypes {
  Load = '[LIST] LOAD',
  LoadSuccess = '[LIST] LOADED_SUCCESS',
  Add = '[LIST] ADD',
  AddSuccess = '[LIST] ADD_SUCCESS',
  Update = '[LIST] UPDATE',
  UpdateSuccess = '[LIST] UPDATE_SUCCESS',
  Remove = '[LIST] REMOVE',
  RemoveSuccess = '[LIST] REMOVE_SUCCESS',
}

export class Load implements Action {
  readonly type: ActionTypes.Load = ActionTypes.Load;
  constructor(public payload?: List[] | null) {}
}

export class LoadSuccess implements Action {
  readonly type: ActionTypes.LoadSuccess = ActionTypes.LoadSuccess;
  constructor(public payload: List[]) {}
}

export class Add implements Action {
  readonly type: ActionTypes.Add = ActionTypes.Add;
  constructor(public payload: string) {}
}

export class AddSuccess implements Action {
  readonly type: ActionTypes.AddSuccess = ActionTypes.AddSuccess;
  constructor(public payload: List) {}
}

export class Update implements Action {
  readonly type: ActionTypes.Update = ActionTypes.Update;
  constructor(public payload: List) {}
}

export class UpdateSuccess implements Action {
  readonly type: ActionTypes.UpdateSuccess = ActionTypes.UpdateSuccess;
  constructor(public payload: List) {}
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
