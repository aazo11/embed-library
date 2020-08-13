import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { HowItWorksComponent } from 'src/app/pages/how-it-works/how-it-works.component';
import { CompanyComponent } from 'src/app/pages/company/company.component';
import { ContactComponent } from 'src/app/pages/contact/contact.component';
import { WidgetLibraryComponent } from 'src/app/pages/widget-library/widget-library.component';
import { PreviewComponent } from 'src/app/pages/preview/preview.component';
import { CaseStudyComponent } from 'src/app/pages/case-study/case-study.component';
import { PrivacyComponent } from 'src/app/pages/privacy/privacy.component';
import { TosComponent } from 'src/app/pages/tos/tos.component';

import { WidgetComponent } from 'src/app/components/widget/widget.component';
import { SearchComponent } from 'src/app/components/search/search.component';
import { WidgetDialogComponent } from 'src/app/components/widget-dialog/widget-dialog.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { TouchPanelComponent } from 'src/app/components/touch-panel/touch-panel.component';
import { ContactSuccessDialogComponent } from 'src/app/components/contact-success-dialog/contact-success-dialog.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ClipboardModule } from 'ngx-clipboard';
import { CachedSrcDirective } from './cached-src.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HowItWorksComponent,
    CompanyComponent,
    ContactComponent,
    WidgetLibraryComponent,
    PreviewComponent,
    CaseStudyComponent,
    PrivacyComponent,
    TosComponent,

    HeaderComponent,
    FooterComponent,
    ButtonComponent,
    TouchPanelComponent,
    WidgetComponent,
    SearchComponent,
    WidgetDialogComponent,
    ContactSuccessDialogComponent,
    CachedSrcDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSnackBarModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatMenuModule,
    HttpClientModule,
    ClipboardModule,
  ],
  entryComponents: [
    WidgetDialogComponent,
    ContactSuccessDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
