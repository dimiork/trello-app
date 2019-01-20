import { List } from '../../models/list';
import * as ListActions from './actions';

export const initialState: List[] = [];

export function ListsReducer(
  state: List[] = initialState,
  action: ListActions.ListActionType
): List[] {
  switch (action.type) {
    case ListActions.ActionTypes.LOAD:
      return action.lists;

    case ListActions.ActionTypes.ADD:
      return [
        ...state,
        {
          id: action.id,
          title: action.title,
          items: action.items
        }
      ];

    case ListActions.ActionTypes.REMOVE:
      return state.filter((list: List) => action.id !== list.id);

    case ListActions.ActionTypes.CLEAR:

      return initialState;

    default:
      return state;
  }
}
