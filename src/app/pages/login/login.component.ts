import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { UrlServices, GlobalVariables } from '../../global';
import { MatDialog } from '@angular/material/dialog';
import { NewUserComponent } from '../new-user/new-user.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from '../../utils/forms.utils';
import { MessageType } from '../../msg/alert.msg';
import { UserService } from 'src/app/services/userService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  hidePwd: boolean;
  constructor(
    private userService: UserService,
    private router: Router,
    public global: GlobalVariables,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private utl: FormUtils
    ) {
      this.hidePwd = true;
      this.setTitulo();
      this.form = this.fb.group({
        user: [null, Validators.required],
        pwd: [null, Validators.required]
      });
    }

  ngOnInit() {
  }
  setTitulo() {
    this.global.setComponentTitle('Login');
  }
  registrarse() {
    const dialogRef = this.dialog.open(NewUserComponent, {
      width: '400px',
      panelClass: 'myapp-no-padding-dialog'
    });
    dialogRef.afterClosed().subscribe(data => {
      this.setTitulo();
    });
  }
  ingresar() {
    if (this.form.invalid) {
      FormUtils.MarkAsTouch(this.form);
      return;
    }
    this.userService.login(this.form.value).subscribe(loginOk => {
      if (loginOk) {
        this.router.navigate(['participantesPuntos']);
      } else {
        this.utl.showMsg('No está autorizado para ingresar', MessageType.warning);
      }
    });
  }
}
