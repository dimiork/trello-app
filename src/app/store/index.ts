import { ActionReducerMap } from '@ngrx/store';

import * as fromItem from './reducers/item';
import * as fromList from './reducers/list';
import { Item, List } from '../models';

export interface State {
  lists: List[];
  // items: Item[];
  items: fromItem.State;
}

export const reducers: ActionReducerMap<State> = {
  lists: fromList.reducer,
  items: fromItem.reducer
};
