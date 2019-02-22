import { ActionTypes, ActionsUnion } from '../actions/list';
import { List, Item, ServiceItem } from '../../models';

export const initialState: List[] = [];

export function reducer(
  state: List[] = initialState,
  action: ActionsUnion
): List[] {

  switch (action.type) {

    case ActionTypes.Load:
      return state;

    case ActionTypes.LoadSuccess:
      return action.payload;

    case ActionTypes.AddSuccess:
      return [ ...state, action.payload ];

    case ActionTypes.Add:
      return state;

    case ActionTypes.UpdateSuccess:
      return state.map((list: List) => {
        if (list.id === action.payload.id) {

          return {
            ...list,
            title: action.payload.title,
            // items: [...action.payload]
          };
        }

        return list;
      });

    case ActionTypes.Remove:
      return state;

    case ActionTypes.RemoveSuccess:
      return state.filter((list: List) => list.id !== action.payload);

    // case ActionTypes.AddItemSuccess:
    // const index: number = action.payload.insertionIndex;

    //   return state.map((list: List) => list.id === action.payload ?
    //     {
    //       ...list,
    //       items: [ ...list.items.slice(0, index),
    //                   action.payload,
    //                ...list.items.slice(index)
    //              ]
    //     } : list);

    // case ActionTypes.RemoveItemSuccess:
    //   return state.map((list: List) => list.id === action.payload ?
    //     {
    //       ...list,
    //       items: list.items.filter((item: Item) => item.id !== action.payload)
    //     } : list);

    default:
      return state;
  }
}
