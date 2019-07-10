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
 
 // @Input() appChildMessage: string;
  private idNewsLocal: string;
  ngOnInit() {  
    this.data.count.subscribe(c => {
      this.count = Number(localStorage.getItem(this.idNewsLocal));
      localStorage.setItem(this.idNewsLocal, c.toString());
      console.log("bvbvbvbvbvbvbvbvbv   " + localStorage.getItem(this.idNewsLocal));
    });
  }
  oneNews: NewsModel;
  count: number;
  constructor(private data: DataService) { }
}

//ngOnInit() {
//  this.data.currentNews.subscribe(news => this.oneNews = news)
//}
//oneNews: NewsModel;
