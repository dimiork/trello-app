import { ActionTypes, ActionsUnion } from '../actions/item';
import { List, Item } from '../../models';

export const initialState: Item[] = [];

export function reducer(
  state: Item[] = initialState,
  action: ActionsUnion
): Item[] {

  switch (action.type) {

    case ActionTypes.Load:
      return state;

    case ActionTypes.LoadSuccess:
      return action.payload;

    case ActionTypes.Add:
      return state;

    case ActionTypes.AddSuccess:
      return [ ...state, action.payload ];

    case ActionTypes.Update:
      return state;

    case ActionTypes.UpdateSuccess:
      return state.map((item: Item) => {
        if (item.id === action.payload.id) {

          return {
            ...item,
            title: action.payload.title,
          };
        }

        return item;
      });

    case ActionTypes.Remove:
      return state;

    case ActionTypes.RemoveSuccess:
      return state.filter((item: Item) => item.id !== action.payload);

    case ActionTypes.RemoveAllByList:
      return state.filter((item: Item) => item.listId !== action.payload);

    default:
      return state;
  }
}
