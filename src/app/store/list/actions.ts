import { Action } from '@ngrx/store';

import { List } from '../../models/list';
import { Item } from '../../models/item';
import { EditItemModal } from '../../models/edit-item-modal';

export enum ActionTypes {
  Load = '[LISTS] LOAD',
  LoadSuccess = '[LISTS] LOADED_SUCCESS',
  LoadFail = '[LISTS] LOADED_FAIL',
  Add = '[LIST] ADD',
  AddSuccess = '[LIST] ADD_SUCCESS',
  AddFail = '[LIST] ADD_FAIL',
  Update = '[LIST] UPDATE',
  UpdateSuccess = '[LIST] UPDATE_SUCCESS',
  Remove = '[LIST] REMOVE',
  RemoveSuccess = '[LIST] REMOVE_SUCCESS',
  // Clear = '[LIST] CLEAR',
  AddItem = '[LIST] ADD_ITEM',
  AddItemSuccess = '[LIST] ADD_ITEM_SUCCESS',
  // UpdateItem = '[LIST] UPDATE_ITEM',
  RemoveItem = '[LIST] REMOVE_ITEM',
  RemoveItemSuccess = '[LIST] REMOVE_ITEM_SUCCESS'
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

export class AddItem implements Action {
  readonly type = ActionTypes.AddItem;
  // public id: string = Math.random().toString(26).slice(2);

  constructor(public payload: EditItemModal) {}
}

export class AddItemSuccess implements Action {
  readonly type = ActionTypes.AddItemSuccess;
  // public id: string = Math.random().toString(26).slice(2);

  constructor(public payload: EditItemModal) {}
}

// export class DragItem implements Action {
//   readonly type = ActionTypes.DragItem;

//   constructor(public payload: EditItemModal) {}
// }

// export class DropItem implements Action {
//   readonly type = ActionTypes.DropItem;

//   constructor(public payload: EditItemModal) {}
// }

// export class UpdateItem implements Action {
//   readonly type: string = ActionTypes.UpdateItem;

//   constructor(
//     public listId: string,
//     public item: Item
//   ) {}
// }

export class RemoveItem implements Action {
  readonly type = ActionTypes.RemoveItem;

  constructor(public payload: EditItemModal) {}
}

export class RemoveItemSuccess implements Action {
  readonly type = ActionTypes.RemoveItemSuccess;

  constructor(public payload: EditItemModal) {}
}

export type ActionsUnion
  = Load
  | LoadSuccess
  | LoadFail
  | Add
  | AddSuccess
  | Update
  | UpdateSuccess
  | Remove
  | RemoveSuccess
  | AddItem
  | AddItemSuccess
  | RemoveItem
  | RemoveItemSuccess;
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
