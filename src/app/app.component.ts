import { Component } from '@angular/core';
import { RespAuthMsg } from './msg/loginMsg';
import { UserService } from './services/userService';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'James Brown Pharma';
  currentUser: any;
  nombreUsuario: string;

  constructor(
    private userService: UserService,
    private route: Router,
  ) {
    userService.logout();
    userService.currentUser.subscribe(usr => {
      this.currentUser = usr;
      console.log(this.currentUser);
      if(this.currentUser){
        this.nombreUsuario=this.currentUser.Nombre;
      }
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
