import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from 'src/app/pages/home/home.component';
import { HowItWorksComponent } from 'src/app/pages/how-it-works/how-it-works.component';
import { WidgetLibraryComponent } from 'src/app/pages/widget-library/widget-library.component';
import { CompanyComponent } from 'src/app/pages/company/company.component';
import { ContactComponent } from 'src/app/pages/contact/contact.component';
import { PreviewComponent } from 'src/app/pages/preview/preview.component';
import { CaseStudyComponent } from 'src/app/pages/case-study/case-study.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'how-it-works', component: HowItWorksComponent },
  { path: 'visualizations', component: WidgetLibraryComponent },
  { path: 'company', component: CompanyComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'preview/:id', component: PreviewComponent },
  { path: 'case-study/:brand', component: CaseStudyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
