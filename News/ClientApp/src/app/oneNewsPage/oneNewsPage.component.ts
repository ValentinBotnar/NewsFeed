import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { NewsModel } from '../interface/newsModel';
import { Router } from '@angular/router';
import { AllNewsPageComponent } from '../allNewsPage/allNewsPage.component';
import { DataService } from '../data.service';

@Component({
  selector: 'onePage',
  templateUrl: './oneNewsPage.html'
})

export class OneNewsPageComponent implements OnInit {
 
  private idNewsLocal: string;
  ngOnInit() {
      //get data of one selected news from local storage
      this.oneNews = JSON.parse(localStorage.getItem(this.idNewsLocal));

      this.oneNewsId = this.oneNews.id;
      this.oneNewsHeader = this.oneNews.header;
      this.oneNewsText = this.oneNews.text;
  }

  oneNews: NewsModel;
  oneNewsId: number;
  oneNewsHeader: string;
  oneNewsText: string;

  constructor(private data: DataService) { }
}
