import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    // FormsModule,
    MaterialModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    // StoreModule.forRoot(reducers, { metaReducers }),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    }),
    EffectsModule.forRoot([]),
    // !environment.production ? StoreDevtoolsModule.instrument() : [],
    AuthModule,
  ],
  // entryComponents: [EditItemComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
