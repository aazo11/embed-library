import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WidgetLibraryComponent } from 'src/app/components/widget-library/widget-library.component';
import { WidgetComponent } from 'src/app/components/widget/widget.component';
import { SearchComponent } from 'src/app/components/search/search.component';
import { WidgetDialogComponent } from 'src/app/components/widget-dialog/widget-dialog.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ClipboardModule } from 'ngx-clipboard';
import { CachedSrcDirective } from './cached-src.directive';


@NgModule({
  declarations: [
    AppComponent,
    WidgetLibraryComponent,
    WidgetComponent,
    SearchComponent,
    WidgetDialogComponent,
    CachedSrcDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatCardModule,
    MatSnackBarModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    HttpClientModule,
    ClipboardModule,
  ],
  entryComponents: [
    WidgetDialogComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
