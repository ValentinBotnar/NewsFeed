import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { NewsModel } from '../interface/newsModel';
import { Router } from '@angular/router';

@Component({
  selector: 'onePage',
  templateUrl: './oneNewsPage.html'
})

export class OneNewsPage implements OnInit {

  ngOnInit() { }

}

