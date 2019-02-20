import { ActionTypes, ActionsUnion } from './actions';

import { List, Item, ServiceItem } from '../../models';

export const initialState: List[] = [];

export function reducer(state = initialState, action: ActionsUnion): List[] {

  switch (action.type) {

    case ActionTypes.Load:
    case ActionTypes.Add:
    case ActionTypes.Update:
    case ActionTypes.Remove:
    case ActionTypes.AddItem:
    case ActionTypes.RemoveItem:
    case ActionTypes.ErrorHandle:
      return state;

    case ActionTypes.LoadSuccess:
      return action.payload.lists;

    case ActionTypes.AddSuccess:
      return [ ...state, action.payload.list ];

    case ActionTypes.UpdateSuccess:
      return state.map((list: List) => {
        if (list.id === action.payload.list.id) {
          
          return {
            ...list,
            title: action.payload.list.title,
            items: [...action.payload.list.items]
          };
        }

        return list;
      });

    case ActionTypes.RemoveSuccess:
      return state.filter((list: List) => list.id !== action.payload.id);

    case ActionTypes.AddItemSuccess:
    const index = action.payload.insertionIndex;
      return state.map((list: List) => list.id === action.payload.listId ?
        {
          ...list,
          items: [ ...list.items.slice(0, index),
                      action.payload.item,
                   ...list.items.slice(index)
                 ]
        } : list);

    case ActionTypes.RemoveItemSuccess:
      return state.map((list: List) => list.id === action.payload.listId ?
        {
          ...list,
          items: list.items.filter((item: Item) => item.id !== action.payload.item.id)
        } : list);

    default:
      return state;
  }
}
