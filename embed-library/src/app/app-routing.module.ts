import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "src/app/pages/home/home.component";
import { HowItWorksComponent } from "src/app/pages/how-it-works/how-it-works.component";
import { WidgetLibraryComponent } from "src/app/pages/widget-library/widget-library.component";
import { CompanyComponent } from "src/app/pages/company/company.component";
import { ContactComponent } from "src/app/pages/contact/contact.component";
import { PreviewComponent } from "src/app/pages/preview/preview.component";
import { CaseStudyComponent } from "src/app/pages/case-study/case-study.component";
import { PrivacyComponent } from "src/app/pages/privacy/privacy.component";
import { TosComponent } from "src/app/pages/tos/tos.component";
import { DemoComponent } from "src/app/pages/demo/demo.component";
import { SelfserveComponent } from "src/app/pages/selfserve/selfserve.component";
import { ClickthroughAgreementComponent } from "src/app/pages/clickthrough-agreement/clickthrough-agreement.component";
import { SuccessStoriesComponent } from "src/app/pages/success-stories/success-stories.component";
import {AnnouncementsComponent} from 'src/app/pages/announcements/announcements.component'

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "how-it-works", component: HowItWorksComponent },
  { path: "visualizations", component: WidgetLibraryComponent },
  { path: "company", component: CompanyComponent },
  { path: "advisors", redirectTo: "/company#advisors" },
  { path: "contact", component: ContactComponent },
  { path: "preview", component: PreviewComponent },
  { path: "preview/:collection", component: PreviewComponent },
  { path: "case-study/:brand", component: CaseStudyComponent },
  { path: "privacy", component: PrivacyComponent },
  { path: "demo", component: DemoComponent },
  { path: "selfserve", component: SelfserveComponent },
  { path: "tos", component: TosComponent },
  { path: "clickthrough-agreement", component: ClickthroughAgreementComponent },
  { path: "success-stories", component: SuccessStoriesComponent },
  { path: "announcements", component: AnnouncementsComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "enabled",
      anchorScrolling: "enabled",
      initialNavigation: "enabled",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
