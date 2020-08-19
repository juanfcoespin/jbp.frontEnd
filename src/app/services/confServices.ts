import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Promotick, ConfMsg } from '../msg/confMsg';



@Injectable()
export class ConfServices {
     
    constructor(private http: HttpClient) {}
    
    get(): Observable<ConfMsg> {
      return this.http.get<ConfMsg>('/assets/data/conf.json');
    }
}
