import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ActionTypes, ActionsUnion } from '../actions/error';

export function reducer(state: any = null, action: ActionsUnion): any {
  switch (action.type) {

    case ActionTypes.Error: {
      return action.payload;
    }

    default:
      return state;
  }
}
