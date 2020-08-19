import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Promotick, ConfMsg } from '../msg/confMsg';
import { EstadoCuentaMsg, RucMsg } from '../msg/promotickMsg';
import { ConfServices } from './confServices';



@Injectable()
export class PromotickServices {
    private subject = new Subject<any>();
    private subject2 = new Subject<any>();
    
    constructor(
        private http: HttpClient,
        private confServices: ConfServices
    ) {
        
    }
    getEstadoCuentaByRuc(ruc:string):Observable<any>{
        this.confServices.get().subscribe(conf=>{
            const url=conf.WSUrls.Server+conf.WSUrls.Promotick+'/getEstadoCuenta/'+ruc;
            this.http.get<any>(url).subscribe(resp=>{
                this.subject.next(JSON.parse(resp));
            });      
        });
        return this.subject.asObservable();
    }
    getDocumentosEnviadosByRuc(ruc:string):Observable<any>{
        this.confServices.get().subscribe(conf=>{
            const url=conf.WSUrls.Server+conf.WSUrls.Promotick+'/getDocumentosEnviados/'+ruc;
            this.http.get<any>(url).subscribe(resp=>{
                this.subject2.next(resp);
            });      
        });
        return this.subject2.asObservable();
    }
    getHeaderWsPromotick(ptkConf: Promotick):any{
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'Basic ' + btoa(ptkConf.User+':'+ptkConf.Pwd)
            })
          };
        return httpOptions;
    }
    
}