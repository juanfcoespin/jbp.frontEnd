import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlServices, GlobalVariables } from '../../global';
import { MessageType } from '../../msg/alert.msg';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ParentErrorStateMatcher, PasswordValidator } from '../../utils/validators/password.validator';
import { FormUtils} from '../../utils/forms.utils';
import { CatalogUtils } from '../../utils/catalog.utils';
import { UserService } from 'src/app/services/userService';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})

export class NewUserComponent implements OnInit {
  user:any={};
  habilitarRegistro:boolean=false;
  procesando:boolean=false;
  parentErrorStateMatcher = new ParentErrorStateMatcher();
  constructor(
    public global: GlobalVariables,
    public userService: UserService
  ) {
    this.global.setComponentTitle('Gestión Usuarios App Movil');
  }
  ngOnInit() {}
  createUser() {
  }
  getUser(){
    this.habilitarRegistro=true;
    if(this.user && this.user.userName){
      this.procesando=true;
      const userName=this.user.userName;
      this.userService.getUserDetails(this.user.userName).subscribe(user=>{
        this.user = user;
        this.user.userName = userName;
        this.habilitarRegistro = true;
        console.log(this.user);
        this.procesando=false;
      });
    }else{
      const msg='Debe ingresar el nombre de usuario del Directorio Activo!!';
    }
  }
}
