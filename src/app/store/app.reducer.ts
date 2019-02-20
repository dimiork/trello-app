import { ActionReducerMap } from '@ngrx/store';

import { List } from '../models/list';

import * as fromList from './list/reducers';

export interface AppState {
  lists: List[];
}

export const rootReducers: ActionReducerMap<AppState> = {
  lists: fromList.reducer
};
