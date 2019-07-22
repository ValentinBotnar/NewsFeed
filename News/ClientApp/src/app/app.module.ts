import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { OneNewsPageComponent } from './oneNewsPage/oneNewsPage.component';
import { AllNewsPageComponent } from './allNewsPage/allNewsPage.component';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent, 
    HomeComponent,
    FetchDataComponent,
    OneNewsPageComponent,
    AllNewsPageComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    BrowserModule,
    RouterModule.forRoot([  
      { path: '', component: AllNewsPageComponent },
      { path: 'oneNews', component: OneNewsPageComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
