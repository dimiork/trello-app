import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';
import * as fromItem from '../reducers/item';

// import { Item } from '../../models';

export const selectItemState /* : MemoizedSelector<Item, fromItem.State> */ = createFeatureSelector<fromItem.State>('items');

export const selectAllItems /* : MemoizedSelector<Item, Item[]> */ = createSelector(
  selectItemState,
  fromItem.selectAll
);
