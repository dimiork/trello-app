import { ActionReducerMap } from '@ngrx/store';

import { ListsReducer } from './list/reducers';
import { List } from '../models/list';

export interface AppState {
  lists: List[];
}

export const rootReducer: ActionReducerMap<AppState> = {
  lists: ListsReducer
};
