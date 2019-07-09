import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { NewsModel } from '../interface/newsModel';

//@Injectable({
//  providedIn: 'root'
//})
export class SignalRService {
  public data: NewsModel[];

  private hubConnection: signalR.HubConnection

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('/ConsumeScopedService')
      .build(); 

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }
  
  public addTransferChartDataListener = () => {
    this.hubConnection.on('ReceiveMessage', (data, e) => {
      this.data = data;
      console.log(data);
    });
  }
}
