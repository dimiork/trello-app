import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';
import * as fromItem from '../reducers/item';
import { Item } from '../../models';

export const selectItemState:  MemoizedSelector<object, fromItem.State> = createFeatureSelector<fromItem.State>('items');

export const selectAllItems: MemoizedSelector<object, Item[]> = createSelector(
  selectItemState,
  fromItem.selectAll
);

export const selectActiveItem: MemoizedSelector<object, Item> = createSelector(
  selectItemState,
  (state: fromItem.State) => state.selectedItem
);

export const getNewItemPositionIndex: (listId: string) => MemoizedSelector<object, number> =
  (listId: string): MemoizedSelector<object, number> => createSelector(
  selectAllItems,
  (items: Item[]) => (2 * (Object.values(items)
  .filter((el: Item) => el.listId === listId)
  .reduce((acc: number, el: Item) => Math.max(acc, el._position), 0))) || 1024,
);
