import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { UrlShortenerComponent } from './features/home/components/url-shortener/url-shortener.component';
import { TrendingUrlsComponent } from './features/home/components/trending-urls/trending-urls.component';
import { HomeMainComponent } from './features/home/components/home-main/home-main.component';
import UrlShortVisitMainComponent from './features/url-short-visit/components/url-short-visit-main/url-short-visit-main.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    UrlShortenerComponent,
    TrendingUrlsComponent,
    HomeMainComponent,
    UrlShortVisitMainComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
