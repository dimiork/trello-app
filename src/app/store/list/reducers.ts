import { ActionTypes, ActionsUnion } from './actions';

import { List, Item, EditItemModal } from '../../models';

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
          console.log(action);
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

    case ActionTypes.AddItem:
      return state;

    case ActionTypes.AddItemSuccess:
      return state.map((list: List) => list.id === action.payload.listId ?
        {
          ...list,
          items: [...list.items, action.payload.item]
        } : list);

    case ActionTypes.RemoveItem:
      return state;

    case ActionTypes.RemoveItemSuccess:
      return state.map((list: List) => list.id === action.payload.listId ?
        {
          ...list,
          items: list.items.filter((item: Item) => item.id !== action.payload.item.id)
        } : list);

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
