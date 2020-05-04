import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WidgetLibraryComponent } from './widget-library/widget-library.component';
import { WidgetCardComponent } from './widget-card/widget-card.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatCardModule,   
} from '@angular/material/card';
import {   MatSnackBarModule} from '@angular/material/snack-bar'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClipboardModule } from 'ngx-clipboard';
import { CachedSrcDirective } from './cached-src.directive';


@NgModule({
  declarations: [
    AppComponent,
    WidgetLibraryComponent,
    WidgetCardComponent,
    CachedSrcDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatListModule,
    MatCardModule,
    HttpClientModule,
    ClipboardModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
