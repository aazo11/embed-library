import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IvyCarouselModule } from "angular-responsive-carousel";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "src/app/pages/home/home.component";
import { HowItWorksComponent } from "src/app/pages/how-it-works/how-it-works.component";
import { CompanyComponent } from "src/app/pages/company/company.component";
import { ContactComponent } from "src/app/pages/contact/contact.component";
import { WidgetLibraryComponent } from "src/app/pages/widget-library/widget-library.component";
import { PreviewComponent } from "src/app/pages/preview/preview.component";
import { CaseStudyComponent } from "src/app/pages/case-study/case-study.component";
import { PrivacyComponent } from "src/app/pages/privacy/privacy.component";
import { TosComponent } from "src/app/pages/tos/tos.component";
import { DemoComponent } from "src/app/pages/demo/demo.component";
import { ClickthroughAgreementComponent } from "src/app/pages/clickthrough-agreement/clickthrough-agreement.component";
import { SuccessStoriesComponent } from "src/app/pages/success-stories/success-stories.component";

import { WidgetComponent } from "src/app/components/widget/widget.component";
import { SearchComponent } from "src/app/components/search/search.component";
import { WidgetDialogComponent } from "src/app/components/widget-dialog/widget-dialog.component";
import { HeaderComponent } from "src/app/components/header/header.component";
import { FooterComponent } from "src/app/components/footer/footer.component";
import { ButtonComponent } from "src/app/components/button/button.component";
import { TouchPanelComponent } from "src/app/components/touch-panel/touch-panel.component";
import { ContactSuccessDialogComponent } from "src/app/components/contact-success-dialog/contact-success-dialog.component";
import { LocationSearchComponent } from "src/app/components/location-search/location-search.component";
import { UserFormComponent } from "./components/user-form/user-form.component";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSelectModule } from "@angular/material/select";
import { MatCardModule } from "@angular/material/card";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ClipboardModule } from "ngx-clipboard";
import { CachedSrcDirective } from "./cached-src.directive";
import { SelfserveComponent } from "./pages/selfserve/selfserve.component";
import { PopupComponent } from "./components/popup/popup.component";
import { SelfserveSearchComponent } from "./components/selfserve-search/selfserve-search.component";
import { AnnouncementsComponent } from 'src/app/pages/announcements/announcements.component';

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
    DemoComponent,
    ClickthroughAgreementComponent,
    SuccessStoriesComponent,

    HeaderComponent,
    FooterComponent,
    ButtonComponent,
    TouchPanelComponent,
    WidgetComponent,
    SearchComponent,
    WidgetDialogComponent,
    ContactSuccessDialogComponent,
    LocationSearchComponent,
    UserFormComponent,
    CachedSrcDirective,
    SelfserveComponent,
    PopupComponent,
    SelfserveSearchComponent,
    AnnouncementsComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "serverApp" }),
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSnackBarModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    ClipboardModule,
    IvyCarouselModule,
  ],
  entryComponents: [WidgetDialogComponent, ContactSuccessDialogComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
