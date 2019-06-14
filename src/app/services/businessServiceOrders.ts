import { HubConnection, HubConnectionBuilder  } from '@aspnet/signalr';
import { UrlServices } from '../global';
import {Observable, observable} from 'rxjs';
import { Injectable } from '@angular/core';
import {LogMsg} from 'src/app/msg/common.msg';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BusinessServiceOrders {
    private hub: HubConnection;
    public logObservable: Observable<LogMsg>;
    public isRunningResponse: Observable<boolean>;
    public serviceHubUrl: string;
    public serviceOrdersUrl: string;
    constructor(private http: HttpClient) {}

    public initHub() {
        this.hub =  new HubConnectionBuilder().withUrl(this.serviceHubUrl).build();
        this.hub
        .start()
        .then(() => console.log('Connection started!'))
        .catch(err => console.log('Error while establishing connection :('));

        this.logObservable = new Observable<LogMsg>( obs => {
            this.hub.on('PushLog', (log: LogMsg) => obs.next(log));
        });
        this.isRunningResponse = new Observable<boolean>(obs => {
            this.hub.on('IsRunningResponse', (isRunning: boolean) => obs.next(isRunning));
        });
    }
    public checkIsRunning(): Observable<any> {
        console.log(this.serviceOrdersUrl + '/checkIsRunning');
        return this.http.get<any>(this.serviceOrdersUrl + '/checkIsRunning');
    }
    public status(): Observable<any> {
        return this.http.get(this.serviceOrdersUrl + '/status');
    }
    public start(): Observable<any> {
        return this.http.get(this.serviceOrdersUrl + '/start');
    }
    public stop(): Observable<any> {
        return this.http.get(this.serviceOrdersUrl + '/stop');
    }
    // public getTodayLogs(): Observable<LogMsg[]> {
    //     if (this.serviceUrl !== null) {
    //         return this.http.get<LogMsg[]>(this.serviceUrl + '/getTodayLogs');
    //     }
    // }
}
