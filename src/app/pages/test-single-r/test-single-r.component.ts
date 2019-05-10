import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder  } from '@aspnet/signalr';

import { Message } from 'primeng/api';
import {UrlServices} from '../../global';

@Component({
  selector: 'app-test-single-r',
  templateUrl: './test-single-r.component.html',
  styleUrls: ['./test-single-r.component.css']
})
export class TestSingleRComponent implements OnInit {

  private hubConnection: HubConnection;
  msgs: Message[] = [];

  constructor() { }

  ngOnInit(): void {
    // this.msgs.push({ severity: 'error', summary: 'test' });
    this.hubConnection =  new HubConnectionBuilder().withUrl(UrlServices.signalRUrl).build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started!'))
      .catch(err => console.log('Error while establishing connection :('));

    this.hubConnection.on('BroadcastMessage', (type: string, payload: string) => {
      this.msgs.push({ severity: type, summary: payload });
    });
  }

}
