import { List } from '../../models/list';
import { Item } from '../../models/item';
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
      console.log(state)
      return state.map((list: List) => list.id === action.list.id ?
        {
          ...list,
          title: action.list.title.trim(),
          items: [...action.list.items]
        } : list
      );

    case ListActions.ActionTypes.REMOVE:
      return state.filter((list: List) => list.id !== action.id);

    case ListActions.ActionTypes.CLEAR:

      return initialState;

    case ListActions.ActionTypes.ADD_ITEM:
      const item: Item = {
        id: action.id,
        title: action.item.title,
        description: action.item.description
      };

      return state.map((list: List) => list.id === action.listId ?
        {
          ...list,
          items: [...list.items, item]
        } : list);

    case ListActions.ActionTypes.UPDATE_ITEM:
      return state.map((list: List) => list.id === action.listId ?
        {
          ...list,
          items: list.items.map((item: Item) => item.id === action.item.id ?
            action.item : item)
        } : list);

    case ListActions.ActionTypes.REMOVE_ITEM:
      return state.map((list: List) => list.id === action.listId ?
        {
          ...list,
          items: list.items.filter((item: Item) => item.id !== action.id)
        } : list);

    default:
      return state;
  }
}
