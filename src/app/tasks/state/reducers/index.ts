import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
  MetaReducer,
  MemoizedSelector,
} from '@ngrx/store';
import * as fromList from './list';
import * as fromItem from './item';
import * as fromRoot from '../../../state';

import { Item } from '../../models';

export interface TasksState {
  lists: fromList.State;
  items: fromItem.State;
}

export const reducers: ActionReducerMap<TasksState> = {
  lists: fromList.reducer,
  items: fromItem.reducer,
};

export interface State extends fromRoot.State {
  tasks: TasksState;
}

export const getTasksState = createFeatureSelector<TasksState>('tasks');

const getListsState = createSelector(getTasksState, (state: TasksState) => state.lists);
const getItemsState = createSelector(getTasksState, (state: TasksState) => state.items);

const {selectEntities: listsSelectEntities, selectAll: listsSelectAll} = fromList.adapter.getSelectors();
const {selectEntities: itemsSelectEntities, selectAll: itemsSelectAll} = fromItem.adapter.getSelectors();

export const listsDictionary = createSelector(getListsState, listsSelectEntities);
export const listsArray = createSelector(getListsState, listsSelectAll);
// export const listsSomeOtherAttributeNotFromAdapter = createSelector(getListsState, (state: fromList.State) => state.ids as string[]);

export const itemsDictionary = createSelector(getItemsState, itemsSelectEntities);
export const itemsArray = createSelector(getItemsState, itemsSelectAll);

export const getActiveItem: MemoizedSelector<object, Item> = createSelector(
  getItemsState,
  (state: fromItem.State) => state.selectedItem
);

export const getNewItemPositionIndex: (listId: string) => MemoizedSelector<object, number> =
  (listId: string): MemoizedSelector<object, number> => createSelector(
  itemsArray,
  (items: Item[]) => (2 * (Object.values(items)
  .filter((el: Item) => el.listId === listId)
  .reduce((acc: number, el: Item) => Math.max(acc, el._position), 0))) || 1024,
);
