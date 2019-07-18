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

@Component({
  selector: 'onePage',
  templateUrl: './oneNewsPage.html',
  styleUrls: ['./oneNewsPage.css']
})

export class OneNewsPageComponent implements OnInit {
  oneNewsHeader: string;
  oneNewsText: string;
  idOneNewsObject: NewsModel;
  
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

  ngOnInit() { }

  constructor(private route: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

    // send news's id to get all data about this news
    this.idOneNewsObject = new NewsModel(this.route.snapshot.queryParams['idNews'], null, null, null, null, null);

    // get oneSeletedNews and list of news types, types kind and regions
    this.http.post<JSON>(baseUrl + 'api/SampleData/GetInfoNewsCategories', this.idOneNewsObject).subscribe(result => {
      this.newsTypes = result["listNewsTypes"];
      this.newsRegions = result["listNewsRegions"];
      this.newsTypesKinds = result["listNewsTypesKind"];

      this.oneNewsHeader = result["objectSelectedNews"].header;
      this.oneNewsText = result["objectSelectedNews"].text;

      this.inputNewsType = NewsTypeModel.searchNameType(this.newsTypes, result["objectSelectedNews"].idType);

      if (result["objectSelectedNews"].idTypesKind != null) 
        this.inputNewsType = NewsTypesKind.searchNameKind(this.newsTypesKinds, result["objectSelectedNews"].idTypesKind);
      else
        this.inputNewsRegion = NewsRegionModel.searchNameRegion(this.newsRegions, result["objectSelectedNews"].idRegion);
    }, err => { 
      console.log(err);
      // check error status code is 500, if so, do some action
    });
  }

  toggleNewsTypes() {
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

    if (this.buttonNewsTypes == "<") {
      this.toggleNewsTypes();
      if (this.isKindsMenuShow == true)
        this.showNewsTypesKinds = !this.showNewsTypesKinds;
    }

    if (this.showNewsRegions)
      this.buttonNewsRegions = "<";
    else
      this.buttonNewsRegions = ">";
  }
  
  clickNewsType(nameNews: string, typeId: number) {/////////////////////////////////////////
    this.inputNewsType = nameNews;

    this.newsTypesKindSelectedType = NewsTypesKind.searchAllTypesKind(this.newsTypesKinds, typeId);
    if (this.newsTypesKindSelectedType != null) {
      this.isKindsMenuShow = true;
      this.showNewsTypesKinds = !this.showNewsTypesKinds;
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
    this.toggleNewsTypes();
    this.isKindsMenuShow = false;
  }

  SendCategories() {
    var idInputNewsRegion = NewsRegionModel.searchRegionId(this.newsRegions, this.inputNewsRegion);
    var idInputNewsType = NewsTypeModel.searchTypeId(this.newsTypes, this.inputNewsType);
    var idInputNewsTypesKind;

    if (this.nameNewsTypesKind != null)
      idInputNewsTypesKind = NewsTypesKind.searchKindId(this.newsTypesKinds, this.nameNewsTypesKind);
    
      this.http.post<NewsModel>('https://localhost:44342/api/SampleData/GetCategoriesFromClient',
        [this.route.snapshot.queryParams['idNews'], idInputNewsType, idInputNewsRegion, idInputNewsTypesKind]).subscribe();
  }
}
