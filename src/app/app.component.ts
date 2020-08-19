import { Component } from '@angular/core';
import {AuthGuard} from './auth.guard';
import { Observable, BehaviorSubject } from 'rxjs';
import { RespAuthMsg } from './msg/loginMsg';
import { UserService } from './services/userService';
import { Router } from '@angular/router';
//import { routerNgProbeToken } from '@angular/router/src/router_module';
import { BusinessServiceOrders } from 'src/app/services/businessServiceOrders';
import { UrlServices } from 'src/app/global';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  currentUser: RespAuthMsg;
  nombreUsuario: string;

  constructor(
    private userService: UserService,
    private route: Router,
    private ordService: BusinessServiceOrders
  ) {
    userService.logout();
    userService.currentUser.subscribe(usr => {
      this.currentUser = usr;
      if(this.currentUser)
        this.nombreUsuario=this.currentUser.Nombre;
    });
    // ordService.setServiceHubUrl(UrlServices.promotickServiceHubUrl);
    // ordService.setServiceOrderUrl(UrlServices.promotickBusinessServiceOrdersUrl);
  }

  salir() {
    this.userService.logout();
    this.route.navigate(['']);
  }
  getPadding() {
    return this.currentUser ? '56px' : '0px';
  }
}
