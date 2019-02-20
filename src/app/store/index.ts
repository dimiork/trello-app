import { ActionReducerMap } from '@ngrx/store';

import * as fromList from './reducers/list';
import { List } from '../models';

export interface State {
  lists: List[];
  // more state here
}

export const reducers: ActionReducerMap<State> = {
  lists: fromList.reducer
  // more reducers here
};
