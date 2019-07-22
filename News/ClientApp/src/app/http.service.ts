import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewsModel } from './models/newsModel';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) { }

  getAllNewsData() {
    return this.http.get<NewsModel[]>('https://localhost:44342/api/SampleData/SendAllNewsFromDB');
  }

  getOneSeletedNews(news: NewsModel) {
    return this.http.post<JSON>('https://localhost:44342/api/SampleData/GetInfoNewsCategories', news);
  }

  sendCategories(array: any[]) {
    return this.http.post<NewsModel>('https://localhost:44342/api/SampleData/GetCategoriesFromClient', array);
  }
}
