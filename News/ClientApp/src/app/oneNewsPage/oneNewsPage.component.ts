import { Component, OnInit, Output, EventEmitter, Input, Inject } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { NewsModel } from '../models/newsModel';
import { Router, Params, ActivatedRoute  } from '@angular/router';
import { AllNewsPageComponent } from '../allNewsPage/allNewsPage.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NewsTypeModel } from '../models/newsTypeModel';
import { NewsRegionModel } from '../models/newsRegionModel';
import { forEach } from '@angular/router/src/utils/collection';
import { NewsTypesKind } from '../models/newsTypesKind';
import { HttpService } from '../http.service';

@Component({
  selector: 'onePage',
  templateUrl: './oneNewsPage.html',
  styleUrls: ['./oneNewsPage.css'],
  providers: [HttpService]
})

export class OneNewsPageComponent implements OnInit {
  oneNewsHeader: string;
  oneNewsText: string;
  
  newsTypes: NewsTypeModel[] = [];
  newsTypesKinds: NewsTypesKind[] = [];
  newsTypesKindSelectedType: NewsTypesKind[] = [];
  newsRegions: NewsRegionModel[] = [];
  showNewsTypes: boolean = false;
  showNewsRegions: boolean = false;
  showNewsTypesKinds: boolean = false;
  buttonNewsTypes: any = '>';
  buttonNewsRegions: any = '>';
  isKindsMenuShow: boolean = false;
  inputNewsType: string;
  inputNewsRegion: string;
  nameNewsTypesKind: string;

  ngOnInit() {
    // get oneSeletedNews and list of news types, types kind and regions
    // send news's id to get all data about this news
    this.httpService.getOneSeletedNews(new NewsModel(this.route.snapshot.queryParams['idNews'], null, null, null, null, null)).subscribe(result => {
      this.oneNewsHeader = result["objectSelectedNews"].header;
      this.oneNewsText = result["objectSelectedNews"].text;
      this.newsTypes = result["listNewsTypes"];
      this.newsRegions = result["listNewsRegions"];
      this.newsTypesKinds = result["listNewsTypesKind"];
      this.inputNewsType = NewsTypeModel.searchNameType(this.newsTypes, result["objectSelectedNews"].idType);
      this.inputNewsRegion = NewsRegionModel.searchNameRegion(this.newsRegions, result["objectSelectedNews"].idRegion)
      console.log(result);
      console.log(result["objectSelectedNews"].idRegion);
      if (result["objectSelectedNews"].idTypesKind != null)
        this.inputNewsType = NewsTypesKind.searchNameKind(this.newsTypesKinds, result["objectSelectedNews"].idTypesKind);
      else
        this.inputNewsType = NewsTypeModel.searchNameType(this.newsTypes, result["objectSelectedNews"].idType);
    }, err => {
      console.log(err);
      // check error status code is 500, if so, do some action
    });}

constructor(private route: ActivatedRoute, private http: HttpClient, private httpService: HttpService) {}

  toggleNewsTypes() {
    if (this.isKindsMenuShow) {
      this.isKindsMenuShow = false;
      this.showNewsTypesKinds = !this.showNewsTypesKinds;
    }

    this.showNewsTypes = !this.showNewsTypes;

    if (this.buttonNewsRegions == "<")
      this.toggleNewsRegions();

    if (this.showNewsTypes)
      this.buttonNewsTypes = "<";
    else
      this.buttonNewsTypes = ">";
  }

  toggleNewsRegions() {
    this.showNewsRegions = !this.showNewsRegions;

    if (this.isKindsMenuShow) {
      this.isKindsMenuShow = false;
      this.showNewsTypesKinds = !this.showNewsTypesKinds;
    }

    if (this.buttonNewsTypes == "<")
      this.toggleNewsTypes();

    if (this.showNewsRegions)
      this.buttonNewsRegions = "<";
    else
      this.buttonNewsRegions = ">";
  }
  
  clickNewsType(nameNews: string, typeId: number) {
    this.inputNewsType = nameNews;

    this.newsTypesKindSelectedType = NewsTypesKind.searchAllTypesKind(this.newsTypesKinds, typeId);
    if (this.newsTypesKindSelectedType != null) {
      if (!this.isKindsMenuShow) {
        this.showNewsTypesKinds = !this.showNewsTypesKinds;
        this.isKindsMenuShow = true;
      }
    }
    else
      this.toggleNewsTypes();
  }

  clickNewsRegion(nameNews: string) {
    this.inputNewsRegion = nameNews;
    this.toggleNewsRegions();
  }

  clickNewsTypesKind(nameTypesKind: string) {
    this.inputNewsType = nameTypesKind;
    this.nameNewsTypesKind = nameTypesKind;

    this.showNewsTypesKinds = !this.showNewsTypesKinds;
    this.isKindsMenuShow = false;
    this.toggleNewsTypes(); 
  }

  SendCategories() {
    var idInputNewsRegion = NewsRegionModel.searchRegionId(this.newsRegions, this.inputNewsRegion);
    var idInputNewsType = NewsTypeModel.searchTypeId(this.newsTypes, this.inputNewsType);
    var idInputNewsTypesKind;

    if (this.nameNewsTypesKind != null)
      idInputNewsTypesKind = NewsTypesKind.searchKindId(this.newsTypesKinds, this.nameNewsTypesKind);
    
    this.httpService.sendCategories([this.route.snapshot.queryParams['idNews'], idInputNewsType, idInputNewsRegion, idInputNewsTypesKind])
      .subscribe();
  }
}
