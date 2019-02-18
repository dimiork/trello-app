import { Action } from '@ngrx/store';

import { List } from '../../models/list';
import { Item } from '../../models/item';

export enum ActionTypes {
  Load = '[LISTS] LOAD',
  LoadSuccess = '[LISTS] LOADED SUCCESS',
  LoadFail = '[LISTS] LOADED FAIL',
  Add = '[LIST] ADD',
  AddSuccess = '[LIST] ADD SUCCESS',
  AddFail = '[LIST] ADD FAIL',
  Update = '[LIST] UPDATE',
  UpdateSuccess = '[LIST] UPDATE SUCCESS',
  Remove = '[LIST] REMOVE',
  RemoveSuccess = '[LIST] REMOVE SUCCESS',
  // Clear = '[LIST] CLEAR',
  // AddItem = '[LIST] ADD_ITEM',
  // UpdateItem = '[LIST] UPDATE_ITEM',
  // RemoveItem = '[LIST] REMOVE_ITEM'
}

export class Load implements Action {
  readonly type = ActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = ActionTypes.LoadSuccess;

  constructor(public payload: List[]) {}
}

export class LoadFail implements Action {
  readonly type = ActionTypes.LoadFail;

  constructor(public payload: {}) { }
}

export class Add implements Action {
  readonly type = ActionTypes.Add;

  constructor(public payload: string) {}
}

export class AddSuccess implements Action {
  readonly type = ActionTypes.AddSuccess;

  constructor(public payload: List) {}
}

export class AddFail implements Action {
  readonly type = ActionTypes.AddFail;

  constructor(public payload: {}) {}
}

export class Update implements Action {
  readonly type = ActionTypes.Update;

  constructor(public payload: List) {}
}

export class UpdateSuccess implements Action {
  readonly type = ActionTypes.UpdateSuccess;

  constructor(public payload: List) {}
}

export class Remove implements Action {
  readonly type = ActionTypes.Remove;

  constructor(public payload: string) {}
}

export class RemoveSuccess implements Action {
  readonly type = ActionTypes.RemoveSuccess;

  constructor(public payload: string) {}
}

// export class Clear implements Action {
//   readonly type: string = ActionTypes.Clear;
// }

// export class AddItem implements Action {
//   readonly type: string = ActionTypes.AddItem;
//   public id: string = Math.random().toString(26).slice(2);

//   constructor(
//     public listId: string,
//     public item: Item
//   ) {}
// }

// export class UpdateItem implements Action {
//   readonly type: string = ActionTypes.UpdateItem;

//   constructor(
//     public listId: string,
//     public item: Item
//   ) {}
// }

// export class RemoveItem implements Action {
//   readonly type: string = ActionTypes.RemoveItem;

//   constructor(
//     public listId: string,
//     public id: string
//   ) {}
// }

export type ActionsUnion
  = Load
  | LoadSuccess
  | LoadFail
  | Add
  | AddSuccess
  | Update
  | UpdateSuccess
  | Remove
  | RemoveSuccess;
  // | LoadFail
  // | Add
  // | AddSuccess
  // | AddFail
  // | Update
  // | Remove
  // | Clear
  // | AddItem
  // | UpdateItem
  // | RemoveItem;
