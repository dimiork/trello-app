import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ActionTypes, ActionsUnion } from '../actions/item';
import { Item } from '../../models';

export interface State extends EntityState<Item> {
  selectedItemId: string | null;
  loading: boolean;
  loaded: boolean;
}

const adapter: EntityAdapter<Item> = createEntityAdapter<Item>();

export const initialState: State = adapter.getInitialState({
  selectedItemId: null,
  loading: false,
  loaded: false,
});

export function reducer(
  state: State = initialState,
  action: ActionsUnion
): State {

  switch (action.type) {

    case ActionTypes.Load:
      return {
        ...state,
        loading: true
      };

    case ActionTypes.LoadSuccess:
      return adapter.addAll(action.payload.items, { ...state,
        loading: false,
        loaded: true
      });

    case ActionTypes.Add:
      return state;

    case ActionTypes.AddSuccess:
      return adapter.addOne(action.payload.item, state);

    case ActionTypes.Update:
      return state;

    case ActionTypes.UpdateSuccess:
      return adapter.updateOne({
        id: action.payload.id,
        changes: action.payload.changes,
      }, state);

    case ActionTypes.Remove:
      return state;

    case ActionTypes.RemoveSuccess:
      return adapter.removeOne(action.payload.id, state);

    case ActionTypes.RemoveAllByListId:
      return adapter.removeMany(action.payload.listId, state);

    default:
      return state;
  }
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
