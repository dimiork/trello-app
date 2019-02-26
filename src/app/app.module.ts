import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { ListEffects } from './store/effects/list';
import { ItemEffects } from './store/effects/item';
import * as fromRoot from './store';

import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { ListComponent } from './components/list/list.component';
import { ItemComponent } from './components/item/item.component';
import { EditItemComponent } from './components/edit-item/edit-item.component';
import { GetItemsForListIdPipe } from './pipes/get-items-for-list-id.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    ListComponent,
    ItemComponent,
    EditItemComponent,
    GetItemsForListIdPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    StoreModule.forRoot(fromRoot.reducers),
    EffectsModule.forRoot([ListEffects, ItemEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    }),
  ],
  entryComponents: [EditItemComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
