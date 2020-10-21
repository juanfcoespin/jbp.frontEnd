import { Injectable } from '@angular/core';
import {SocioNegocioItem, ParticipantePuntosMsg} from '../msg/socioNegocioMsg';
import { UrlServices } from '../global';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import { SavedME } from '../msg/common.msg';

@Injectable()
export class SocioNegocioService{
    _selectSocioNegocio: Subject<string>=new Subject<string>();
    constructor(private http: HttpClient){}
    selectSocioNegocio(ruc){
      this._selectSocioNegocio.next(ruc);
    }
    onSocioNegocioSelected():Observable<string>{
      return this._selectSocioNegocio.asObservable();
    }
    buscarSocioNegocio(token: string): Observable<SocioNegocioItem[]>{
      if(token && token !== ''){
        const url = UrlServices.SocioNegocioUrl + '/getItemsByToken/' + token;
        return this.http.get<SocioNegocioItem[]>(url);
      }
    }
    getParticipanteByRuc(ruc: string): Observable<any>{
      if (ruc && ruc !== '') {
        const url = UrlServices.SocioNegocioUrl + '/getParticipanteByRuc/' + ruc;
        return this.http.get<any>(url);
      }
    }
    getParticipanteByRucFromERP(ruc: string): Observable<ParticipantePuntosMsg>{
      if (ruc && ruc !== '') {
        const url = UrlServices.SocioNegocioUrl + '/getParticipanteByRucFromERP/' + ruc;
        return this.http.get<ParticipantePuntosMsg>(url);
      }
    }
    getVendedores(): Observable<string[]> {
      const url = UrlServices.SocioNegocioUrl + '/getVendedores';
      return this.http.get<string[]>(url);
    }
    Save(me: ParticipantePuntosMsg) {
      if (me) {
        const url = UrlServices.SocioNegocioUrl + '/SaveParticipante';
        return this.http.post<SavedME>(url, me);
      }
    }
}
