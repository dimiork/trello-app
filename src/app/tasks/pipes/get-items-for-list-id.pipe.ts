import { Pipe, PipeTransform } from '@angular/core';

import { Item } from '../models/';

@Pipe({
  name: 'getItemsForListId'
})
export class GetItemsForListIdPipe implements PipeTransform {

  transform(value: Item[], listId: string, args?: any): any {
    if (!value) {
      return value;
    }

    return value.filter((item: Item) => item.listId === listId);
  }

}
