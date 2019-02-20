import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
// import { ListEffects } from './store/list/effects';
import { ListEffects } from './store/effects/list';
import * as fromRoot from './store/index';
// import { rootReducers } from './store/app.reducer';

// import { SortableModule } from 'ngx-bootstrap/sortable';
// import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { ListComponent } from './components/list/list.component';
import { ItemComponent } from './components/item/item.component';

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
    // SortableModule.forRoot(),
    // BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    // StoreModule.forRoot(rootReducers),
    StoreModule.forRoot(fromRoot.reducers),
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
