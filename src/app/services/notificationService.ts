import { HubConnection, HubConnectionBuilder  } from '@aspnet/signalr';
import { UrlServices } from '../global';
import {Observable, observable} from 'rxjs';
import { Injectable } from '@angular/core';
import {LogMsg} from 'src/app/msg/common.msg';

@Injectable()
export class NotificationService {
    private hub: HubConnection;
    public logObservable: Observable<LogMsg>;
    constructor() {
    }

    public initHub(urlHub: string) {
        console.log(urlHub);
        this.hub =  new HubConnectionBuilder().withUrl(urlHub).build();
        this.hub
        .start()
        .then(() => console.log('Connection started!'))
        .catch(err => console.log('Error while establishing connection :('));

        this.logObservable = new Observable( obs => {
            this.hub.on('PushLog', (log: any) => {
                obs.next(log);
            });
        });
    }
}
