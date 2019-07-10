import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { NewsModel } from './interface/newsModel';
import { OneNewsPage } from './oneNewsPage/oneNewsPage.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app';
  public newsList: NewsModel[] = [];
  allNews: NewsModel[] = [];
  public hubConnection: signalR.HubConnection;
  @Output() idLinkNews = new EventEmitter();

  constructor(private router: Router) {
  }

  ngOnInit() {
    let builder = new signalR.HubConnectionBuilder();

    this.hubConnection = builder.withUrl('/ConsumeScopedService').build();

    this.hubConnection.on("ReceiveMessageAllNews", (list) => {

      this.allNews = list;
    });
    
    this.hubConnection.on("ReceiveMessage", (id, header, text) => {

      this.newsList.push(new NewsModel(id, header, text));
    });
    
    this.hubConnection.start();
  }

  onClick(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;

    this.idLinkNews.emit(value);
    console.log(value);
  }
 
  //onSelect(data) {
  //  this.router.config.find(r => r.component == OneNewsPage).data = data;
  //  this.router.navigate(["/oneNewsPage/oneNewsPage"]);
  //}
}

