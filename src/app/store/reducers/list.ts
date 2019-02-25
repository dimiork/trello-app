import { ActionTypes, ActionsUnion } from '../actions/list';
import { List } from '../../models';

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

    case ActionTypes.Add:
      return state;

    case ActionTypes.AddSuccess:
      return [ ...state, action.payload ];

    case ActionTypes.Update:
      return state;

    case ActionTypes.UpdateSuccess:
      return state.map((list: List) => {
        if (list.id === action.payload.id) {

          return {
            ...list,
            title: action.payload.title,
          };
        }

        return list;
      });

    case ActionTypes.Remove:
      return state;

    case ActionTypes.RemoveSuccess:
      return state.filter((list: List) => list.id !== action.payload);

    default:
      return state;
  }
}
