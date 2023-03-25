import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeMainComponent } from './features/home/components/home-main/home-main.component';
import UrlShortVisitMainComponent from './features/url-short-visit/components/url-short-visit-main/url-short-visit-main.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: "", redirectTo:"home", pathMatch: "full"},
  {path: "home", component:HomeMainComponent},
  {path: ":shortUrl", component:UrlShortVisitMainComponent},
  {path:"**", component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
