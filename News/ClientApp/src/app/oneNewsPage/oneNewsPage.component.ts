import { Component, OnInit, Output, EventEmitter, Input, Inject } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { NewsModel } from '../models/newsModel';
import { Router, Params, ActivatedRoute  } from '@angular/router';
import { AllNewsPageComponent } from '../allNewsPage/allNewsPage.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NewsTypeModel } from '../models/newsTypeModel';
import { NewsRegionModel } from '../models/newsRegionModel';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'onePage',
  templateUrl: './oneNewsPage.html'
})

export class OneNewsPageComponent implements OnInit {
  oneNewsHeader: string;
  oneNewsText: string;
  idOneNewsObject: NewsModel;
  showNewsTypes: boolean = false;
  showNewsRegions: boolean = false;
  newsTypes: NewsTypeModel[] = [];
  newsRegions: NewsRegionModel[] = [];
  buttonNewsTypes: any = '>';
  buttonNewsRegions: any = '>';
  inputNewsType: string;
  inputNewsRegion: string;

  ngOnInit() { }

  constructor(private route: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

    this.idOneNewsObject = new NewsModel(this.route.snapshot.queryParams['idNews'], null, null);

    this.http.post<NewsModel>(baseUrl + 'api/SampleData/GetOneNewsById', this.idOneNewsObject)
      .subscribe(
        (data: NewsModel) => { this.oneNewsHeader = data.header; this.oneNewsText = data.text; },
        error => console.log(error)
      );

    // get list of news's types from server BD
    this.http.get<NewsTypeModel[]>(baseUrl + 'api/SampleData/GetNewsTypes').subscribe(result => {
      this.newsTypes = result;
    }, err => {
      console.log(err);
      // check error status code is 500, if so, do some action
    });


    // get list of news's regions from server BD
    this.http.get<NewsRegionModel[]>(baseUrl + 'api/SampleData/GetNewsRegions').subscribe(result => {
      this.newsRegions = result;
    }, err => {
      console.log(err);
      // check error status code is 500, if so, do some action
    });
  }

  toggleNewsTypes() {
    this.showNewsTypes = !this.showNewsTypes;

    if (this.buttonNewsRegions == "<")///////////////////////
      this.toggleNewsRegions();

    if (this.showNewsTypes)
      this.buttonNewsTypes = "<";
    else
      this.buttonNewsTypes = ">";
  }

  toggleNewsRegions() {
    this.showNewsRegions = !this.showNewsRegions;

    if (this.buttonNewsTypes == "<")/////////////////////////////
      this.toggleNewsTypes();

    if (this.showNewsRegions)
      this.buttonNewsRegions = "<";
    else
      this.buttonNewsRegions = ">";
  }

  clickNewsType(nameNews: string) {
    this.inputNewsType = nameNews;
    this.toggleNewsTypes();
  }

  clickNewsRegion(nameNews: string) {
    this.inputNewsRegion = nameNews;
    this.toggleNewsRegions();
  }

  SendCategories() {
    if (this.inputNewsType != null && this.inputNewsRegion != null) {
      var idInputNewsType;
      var idInputNewsRegion;  

      this.newsTypes.forEach((news) => {
        if (news.nameNewsType == this.inputNewsType)
          idInputNewsType = news.id;
      })

      this.newsRegions.forEach((news) => {
        if (news.nameNewsRegion == this.inputNewsRegion)
          idInputNewsRegion = news.id;
      })

      var SelectedNewsCategories: number[] = [this.route.snapshot.queryParams['idNews'], idInputNewsType, idInputNewsRegion];
      console.log(SelectedNewsCategories);  
      this.http.post<NewsModel>('https://localhost:44342/api/SampleData/GetCategoriesFromClient', SelectedNewsCategories)
        .subscribe();
    }
  }
}
