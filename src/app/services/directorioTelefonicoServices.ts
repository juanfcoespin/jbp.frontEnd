import {HttpClient} from '@angular/common/http';
import {Observable, observable} from 'rxjs';
import { Injectable } from '@angular/core';
import { DirectorioMsg} from '../msg/directorioMsg';


@Injectable()
export class DirectorioTelefonicoService{
    constructor(private http: HttpClient){}

    getDirectorio():Observable<DirectorioMsg[]>{
        return this.http.get<DirectorioMsg[]>('../../assets/data/directorioTelefonico.json');
    }
}
