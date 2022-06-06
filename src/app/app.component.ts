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
  title = 'James Brown Pharma';
  currentUser: RespAuthMsg;
  nombreUsuario: string;
  verVentas:boolean=false;
  verBodega:boolean=false;
  verFarmacoVigilancia:boolean=false;


  constructor(
    private userService: UserService,
    private route: Router,
    private ordService: BusinessServiceOrders
  ) {
    userService.logout();
    userService.currentUser.subscribe(usr => {
      this.currentUser = usr;
      console.log(this.currentUser);
      if(this.currentUser){
        this.nombreUsuario=this.currentUser.Nombre;
        this.habilitarModulosPorPerfil()
      }
        

    });
  }
  habilitarModulosPorPerfil(){
    this.verBodega=false;
    this.verVentas=false;
    this.verFarmacoVigilancia=false;
    // Por usuario
    if(this.currentUser.UserName=='jespin'){
      this.verBodega=true;
      this.verVentas=true;
      this.verFarmacoVigilancia=true;
    }
    if(this.currentUser.UserName=='sbrown'){
      this.verVentas=true;
    }

    // Por grupo de AD
    if(this.currentUser.GruposDirectorioActivo){
      this.currentUser.GruposDirectorioActivo.forEach(grupo=>{
        if(grupo.toLowerCase()=='ventas'){
          this.verVentas=true;
        }
        if(grupo.toLowerCase()=='bodega'){
          this.verBodega=true;
        }
        if(grupo.toLowerCase()=='asuntosregulatorios'){
          this.verFarmacoVigilancia=true;
        }
      });
    }
  }
  salir() {
    this.userService.logout();
    this.route.navigate(['']);
  }
  getPadding() {
    return this.currentUser ? '56px' : '0px';
  }
}
