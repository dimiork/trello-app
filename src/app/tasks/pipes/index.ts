import { NgModule } from '@angular/core';

import { GetItemsForListIdPipe } from './get-items-for-list-id.pipe';

export const PIPES = [GetItemsForListIdPipe];

@NgModule({
  declarations: PIPES,
  exports: PIPES,
})
export class PipesModule {}
