import { createSelector } from '@ngrx/store';

import { AppState } from '../app.reducer';
import { List } from '../../models/list';

export const getState = (state: AppState) => state;
export const getLists = (state: AppState) => state.lists;
