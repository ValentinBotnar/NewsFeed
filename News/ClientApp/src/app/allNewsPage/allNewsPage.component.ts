import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { NewsModel } from '../interface/newsModel';
import { OneNewsPageComponent } from '../oneNewsPage/oneNewsPage.component';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'AllNews',
  templateUrl: './AllNewsPage.html'
})

export class AllNewsPageComponent implements OnInit {
  title = 'AllNews';
  allNews: NewsModel[] = [];
  public hubConnection: signalR.HubConnection;
  private SelectedNewsLocalStorage: string;
  public id: number;


  defineSelectedNews() {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    this.id = value;

    // Search selected news and push it in local storage
    for (let item of this.allNews) {
      if (item.id == this.id) {
        this.data.defineIdSelectedNews(JSON.stringify(item));
        localStorage.setItem(this.SelectedNewsLocalStorage, JSON.stringify(item));
      }
    }
  }
 
  constructor(private router: Router, private data: DataService) {
  }
  
  ngOnInit() {
    let builder = new signalR.HubConnectionBuilder();

    // Connect to server to ConsumeScopedService class
    this.hubConnection = builder.withUrl('/ConsumeScopedService').build();

    // Message from server with all news from DB
    this.hubConnection.on("ReceiveMessageAllNews", (list) => {

      this.allNews = list;
      // All new news will be show on the top
      this.allNews.reverse(); 
    });

    // Message from server with one new news
    this.hubConnection.on("ReceiveMessage", (id, header, text) => {
      // Add new news on the top
      this.allNews.unshift(new NewsModel(id, header, text)); 
    });

    this.hubConnection.start();
  }
}

