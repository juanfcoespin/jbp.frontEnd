import { Component } from '@angular/core';
import {AuthGuard} from './auth.guard';
import { Observable, BehaviorSubject } from 'rxjs';
import { RespAuthMsg } from './msg/loginMsg';
import { UserService } from './services/userService';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  currentUser: RespAuthMsg;

  constructor(
    private userService: UserService,
    private route: Router
  ) {
    userService.logout();
    userService.currentUser.subscribe(usr => {
      this.currentUser = usr;
    });
  }

  salir() {
    this.userService.logout();
    this.route.navigate(['']);
  }
  getPadding() {
    return this.currentUser ? '56px' : '0px';
  }
}
