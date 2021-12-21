import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Promotick, ConfMsg } from '../msg/confMsg';
import { EstadoCuentaMsg, RucMsg } from '../msg/promotickMsg';
import { ConfigUtils } from '../utils/configUtils';

@Injectable()
export class FacturaServices {
    hojaRuta: any;
    constructor(
        private http: HttpClient
    ) {
        
    }
    setNumFacturaExportacion(me):Observable<any>{
        const url=ConfigUtils.getUrlFromEndPointName('factura')+'/'+'updateFolioFactExportacion';
        //console.log(url);
        return this.http.post<any>(url,me);      
    }
   
}