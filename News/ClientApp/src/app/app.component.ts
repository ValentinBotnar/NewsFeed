import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { NewsModel } from './interface/newsModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app';
  allNews: NewsModel[] = [];
  public hubConnection: signalR.HubConnection;

  constructor(private router: Router) {
  }

  ngOnInit() {}
}

