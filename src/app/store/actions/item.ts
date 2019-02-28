import { Action } from '@ngrx/store';
import { Predicate } from '@ngrx/entity';
import { Item } from '../../models';

export enum ActionTypes {
  Load = '[ITEM] LOAD',
  LoadSuccess = '[ITEM] LOADED_SUCCESS',
  Add = '[ITEM] ADD',
  AddSuccess = '[ITEM] ADD_SUCCESS',
  Select = '[ITEM] SELECT',
  Update = '[ITEM] UPDATE',
  UpdateSuccess = '[ITEM] UPDATE_SUCCESS',
  Remove = '[ITEM] REMOVE',
  RemoveAllByListId = '[ITEM] REMOVE_ALL_BY_LIST_ID',
  RemoveSuccess = '[ITEM] REMOVE_SUCCESS',
}

export class Load implements Action {
  readonly type: ActionTypes.Load = ActionTypes.Load;
  constructor(public payload?: { items: Item[] | null }) {}
}

export class LoadSuccess implements Action {
  readonly type: ActionTypes.LoadSuccess = ActionTypes.LoadSuccess;
  constructor(public payload: { items: Item[] }) {}
}

export class Add implements Action {
  readonly type: ActionTypes.Add = ActionTypes.Add;
  constructor(public payload: { item: Item }) {}
}

export class AddSuccess implements Action {
  readonly type: ActionTypes.AddSuccess = ActionTypes.AddSuccess;
  constructor(public payload: { item: Item }) {}
}

export class Select implements Action {
  readonly type: ActionTypes.Select = ActionTypes.Select;
  constructor(public payload: { item: Item }) {}
}

export class Update implements Action {
  readonly type: ActionTypes.Update = ActionTypes.Update;
  constructor(public payload: { item: Item }) {}
}

export class UpdateSuccess implements Action {
  readonly type: ActionTypes.UpdateSuccess = ActionTypes.UpdateSuccess;
  constructor(public payload: { id: string, changes: Item }) {}
}

export class Remove implements Action {
  readonly type: ActionTypes.Remove = ActionTypes.Remove;
  constructor(public payload: { id: string } ) {}
}

export class RemoveAllByListId implements Action {
  readonly type: ActionTypes.RemoveAllByListId = ActionTypes.RemoveAllByListId;
  constructor(public payload: { listId: Predicate<Item> } ) {}
}

export class RemoveSuccess implements Action {
  readonly type: ActionTypes.RemoveSuccess = ActionTypes.RemoveSuccess;
  constructor(public payload: { id: string }) {}
}

export type ActionsUnion
  = Load
  | LoadSuccess
  | Add
  | AddSuccess
  | Select
  | Update
  | UpdateSuccess
  | Remove
  | RemoveAllByListId
  | RemoveSuccess;
