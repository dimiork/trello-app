import { ActionTypes, ActionsUnion } from './actions';

import { List } from '../../models/list';
import { Item } from '../../models/item';

export const initialState: List[] = [];

export function reducer(state = initialState, action: ActionsUnion): List[] {
  console.log(action);
  switch (action.type) {
    case ActionTypes.Load:
      console.log('Action LOAD');
      return state;

    case ActionTypes.LoadSuccess:
      console.log('Action LOAD SUCCESS');
      const lists = action.payload;
      return lists;

    case ActionTypes.Add:
      return state;

    case ActionTypes.AddSuccess:
      const newList = action.payload;
      return [ ...state, newList ];

    case ActionTypes.Update:
      return state;

    case ActionTypes.UpdateSuccess:

      return state.map((list: List) => {
        if (list.id === action.payload.id) {

          return {
            ...list,
            title: action.payload.title.trim(),
            items: [...action.payload.items]
          };
        }

        return list;
      });

    case ActionTypes.Remove:

      return state.filter((list: List) => list.id !== action.payload);

    // case ActionTypes.CLEAR:

    //   return initialState;

    // case ActionTypes.ADD_ITEM:
    //   const item: Item = {
    //     id: action.id,
    //     title: action.item.title,
    //     description: action.item.description
    //   };

    //   return state.map((list: List) => list.id === action.listId ?
    //     {
    //       ...list,
    //       items: [...list.items, item]
    //     } : list);

    // case ActionTypes.UPDATE_ITEM:
    //   return state.map((list: List) => list.id === action.listId ?
    //     {
    //       ...list,
    //       items: list.items.map((currItem: Item) => currItem.id === action.item.id ?
    //         action.item : currItem)
    //     } : list);

    // case ActionTypes.REMOVE_ITEM:
    //   return state.map((list: List) => list.id === action.listId ?
    //     {
    //       ...list,
    //       items: list.items.filter((currItem: Item) => currItem.id !== action.id)
    //     } : list);

    default:
      return state;
  }
}
