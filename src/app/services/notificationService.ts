import { HubConnection, HubConnectionBuilder  } from '@aspnet/signalr';
import { UrlServices } from '../global';
import {Observable, observable} from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {
    private hubPromotickLog: HubConnection;
    public promotickLogObservable: Observable<any>;
    constructor() {
        this.initHubPromotick();
    }

    initHubPromotick() {
        this.hubPromotickLog =  new HubConnectionBuilder().withUrl(UrlServices.logPromotickServiceHubUrl).build();
        this.hubPromotickLog
        .start()
        .then(() => console.log('Connection started!'))
        .catch(err => console.log('Error while establishing connection :('));

        this.promotickLogObservable = new Observable( obs => {
            this.hubPromotickLog.on('PushLog', (log: any) => {
                obs.next(log);
            });
        });
    }
}
