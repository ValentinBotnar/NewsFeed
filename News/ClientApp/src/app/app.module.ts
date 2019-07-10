import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { OneNewsPageComponent } from './oneNewsPage/oneNewsPage.component';
import { AllNewsPageComponent } from './allNewsPage/allNewsPage.component';
import { DataService } from './data.service';

  //const appRoutes: Routes = [
  //  { path: 'oneNews', component: OneNewsPage },
  //];


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
      //{ path: '', component: HomeComponent, pathMatch: 'full' },
      { path: '', component: AllNewsPageComponent /*outlet: "allNews"*/},
      //{ path: 'fetch-data', component: FetchDataComponent },
      { path: 'oneNews', component: OneNewsPageComponent },
    ])
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
