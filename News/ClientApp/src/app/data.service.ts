import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NewsModel } from './interface/newsModel';

@Injectable()
export class DataService {
  private newsLocalStorage: string;

  currentNewsLocalStorage: BehaviorSubject<string>;
  constructor() {
     this.currentNewsLocalStorage = new BehaviorSubject((localStorage.getItem(this.newsLocalStorage)));
  }
 
  defineIdSelectedNews(News: string) {
     this.currentNewsLocalStorage.next(News);
  }
}

