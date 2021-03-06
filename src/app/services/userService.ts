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
    const url = UrlServices.userUrl + '/login';
    return this.http.post<RespAuthMsg>(url, me)
    .pipe(// permite transformar el tipo de dato de retorno del observable
      map(resp => {
        if (resp && resp.Nombre) {
          
          localStorage.setItem('currentUser', JSON.stringify(resp));
          console.log(resp);
          this.auth.isLoged = true;
          this.currentUserSubject.next(resp);
          return true;
        }
        console.log(resp);
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