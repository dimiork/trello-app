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
    case ListActions.ActionTypes.UPDATE:
      return state.map((list: List) => action.list.id === list.id ?
        {
          ...list,
          title: action.list.title.trim(),
          items: [...action.list.items]
        } : list
      );

    case ListActions.ActionTypes.REMOVE:
      return state.filter((list: List) => action.id !== list.id);

    case ListActions.ActionTypes.CLEAR:

      return initialState;

    case ListActions.ActionTypes.ADD_ITEM:
      return state.map((list: List) => action.id === list.id ?
        {
          ...list,
          items: [...list.items, action.item]
        } : list);

    default:
      return state;
  }
}
