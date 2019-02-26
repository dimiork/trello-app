import { Action } from '@ngrx/store';

export enum ActionTypes {
  Error = '[ERROR] ERROR',
}

export class Error implements Action {
  readonly type: ActionTypes.Error = ActionTypes.Error;
  constructor(public payload: { error: any }) {}
}

export type ActionsUnion = Error;
