import { createSelector } from '@ngrx/store';

import { AppState } from '../app.reducer';
// tslint:disable
export const getState = (state: AppState) => state;
export const getLists = (state: AppState) => state.lists;
// tslint:enable
