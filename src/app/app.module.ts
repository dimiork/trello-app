import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';

import { rootReducers } from './store/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { SortableModule } from 'ngx-bootstrap/sortable';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { ListComponent } from './components/list/list.component';
import { ItemComponent } from './components/item/item.component';
import { EffectsModule } from '@ngrx/effects';
import { ListEffects } from './store/list/effects';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    ListComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // StoreModule.forRoot(rootReducer),
    SortableModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    StoreModule.forRoot(rootReducers),
    // StoreModule.forRoot({ rootReducers }),
    // ListModule,
    // StoreModule.forRoot({ lists: rootReducer }),
    EffectsModule.forRoot([ListEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    })
  ],
  entryComponents: [
    ItemComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
