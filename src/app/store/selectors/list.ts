import {
    createFeatureSelector,
    createSelector,
    MemoizedSelector
  } from '@ngrx/store';
  import * as fromList from '../reducers/list';
  // import { Item } from '../../models';

  export const selectListState /* : MemoizedSelector<Item, fromItem.State> */ = createFeatureSelector<fromList.State>('lists');

  export const selectAllLists /* : MemoizedSelector<Item, Item[]> */ = createSelector(
    selectListState,
    fromList.selectAll
  );
