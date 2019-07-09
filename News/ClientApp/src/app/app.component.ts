import { Component, OnInit } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { NewsModel } from './interface/newsModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app';
  public newsList: NewsModel[];
  //news: NewsModel;
  news: NewsModel = new NewsModel(1, "2", "3");

  public hubConnection: signalR.HubConnection;

 // news: NewsModel = new NewsModel();
  

  ngOnInit() {
    let builder = new signalR.HubConnectionBuilder();

    // as per setup in the startup.cs
    this.hubConnection = builder.withUrl('/ConsumeScopedService').build();

    // message coming from the server
    this.hubConnection.on("ReceiveMessage", (id, header, text) => {

      this.newsList[this.newsList.length].push(new NewsModel(1, "2", "3"));

      console.log(header);
    });

    // starting the connection
    this.hubConnection.start();
  }

 
}

