import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WidgetLibraryComponent } from 'src/app/components/widget-library/widget-library.component'


const routes: Routes = [
  { path: 'library', component: WidgetLibraryComponent },
  { path: '', component: WidgetLibraryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
