import { Injectable } from '@angular/core';
import {
  LoginMsg,
  RespAuthMsg
} from '../msg/loginMsg';
import {UrlServices} from '../global';
import {HttpClient} from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';
import {AuthGuard} from '../auth.guard';
import { map } from 'rxjs/operators';
import { ConfigUtils } from '../utils/configUtils';


@Injectable()
export class UserService {

  private currentUserSubject: BehaviorSubject<RespAuthMsg>;
  public currentUser: Observable<RespAuthMsg>;

  constructor(
    private http: HttpClient,
    private auth: AuthGuard){
      this.currentUserSubject = new BehaviorSubject<RespAuthMsg>(
        JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): RespAuthMsg {
    return this.currentUserSubject.value;
  }

  login(me: LoginMsg): Observable<boolean> {
    let url = ConfigUtils.getUrlFromEndPointName('user')
    url += '/login';
    console.log(url);
    return this.http.post<RespAuthMsg>(url, me)
    .pipe(// permite transformar el tipo de dato de retorno del observable
      map(resp => {
        console.log(resp);
        if (resp && resp.Nombre) {
          
          localStorage.setItem('currentUser', JSON.stringify(resp));
          this.auth.isLoged = true;
          this.currentUserSubject.next(resp);
          return true;
        }
        return false;
        })
    );
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}