import { Component, OnInit, Output, EventEmitter, NgModule, Pipe, Inject } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { NewsModel } from '../models/newsModel';
import { OneNewsPageComponent } from '../oneNewsPage/oneNewsPage.component';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpService } from '../http.service';

@Component({
  selector: 'AllNews',
  templateUrl: './AllNewsPage.html',
  styleUrls: ['./allNewsPage.css'],
  providers: [HttpService]
})

  @Pipe({
    name: 'truncate'  
  })

export class AllNewsPageComponent implements OnInit {
  title = 'AllNews';
  allNews: NewsModel[] = [];
  allNewsr: NewsModel = null;
  oneNews: NewsModel = null;
  public hubConnection: signalR.HubConnection;
  public idSelectedNews: number;

  // Add seleted news's id in URL
  defineSelectedNews(idNews: number) {  
    this.router.navigate(['oneNews'], { queryParams: { idNews: idNews } });
  }
  
  constructor(private router: Router, private httpService: HttpService) {}

  ngOnInit() {
    // Message from server with all news from DB
    this.httpService.getAllNewsData().subscribe(result => {
      this.allNews = result;
      // All new news will be show on the top
      this.allNews.reverse();
    }, err => {
      console.log(err);
      // check error status code is 500, if so, do some action
    });
  
    let builder = new signalR.HubConnectionBuilder();

    // Connect to server to ConsumeScopedService class
    this.hubConnection = builder.withUrl('/ConsumeScopedService').build();

    // Message from server with one new news
    this.hubConnection.on("ReceiveMessage", (id, header, text, idType, idRegion, idTypesKind) => {
      // Add new news on the top
      this.allNews.unshift(new NewsModel(id, header, text, idType, idRegion, idTypesKind)); 
    });

    this.hubConnection.start();
  }
}

