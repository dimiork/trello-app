import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { List } from '../../models';
import { ActionTypes, ActionsUnion } from '../actions/list';

export interface State extends EntityState<List> {
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<List> = createEntityAdapter<List>();

export const initialState: State = adapter.getInitialState({
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
      return adapter.addAll(action.payload.lists, { ...state,
        loading: false,
        loaded: true
      });

    case ActionTypes.Add:
      return state;

    case ActionTypes.AddSuccess:
      return adapter.addOne(action.payload.list, state);

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

    default:
      return state;
  }
}

// export const {
//   selectIds: getListIds,
//   selectEntities: getListEntities,
//   selectAll: getAllLists,
//   selectTotal: getTotalLists,
// } = adapter.getSelectors();

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
