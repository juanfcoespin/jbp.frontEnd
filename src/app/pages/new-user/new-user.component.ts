import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlServices, GlobalVariables } from '../../global';
import { NewUser } from '../../msg/newUser.msg';
import { MessageType } from '../../msg/alert.msg';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ParentErrorStateMatcher, PasswordValidator } from '../../utils/validators/password.validator';
import { FormUtils} from '../../utils/forms.utils';
import { CatalogUtils } from '../../utils/catalog.utils';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})

export class NewUserComponent implements OnInit {
  newUser: NewUser;
  validForm: boolean;
  hidePwd: boolean;
  hideConfirmPwd: boolean;
  form: FormGroup;
  matching_passwords_group: FormGroup;
  parentErrorStateMatcher = new ParentErrorStateMatcher();
  constructor(
    private http: HttpClient,
    private urls: UrlServices,
    public global: GlobalVariables,
    private util: FormUtils,
    private fb: FormBuilder,
    public cat: CatalogUtils
  ) {
    this.hidePwd = true;
    this.hideConfirmPwd = true;
    this.global.setComponentTitle('Registro');
    this.newUser = new NewUser();
  }
  ngOnInit() {
    this.form = this.fb.group(
      {
        nombre: [null, Validators.required],
        email: [null, Validators.email],
        idGenero: [undefined, Validators.required],
        matching_passwords: this.fb.group({
          pwd: [null, [Validators.required, Validators.minLength(5)]],
          confirmPwd: [null, Validators.required]},
          { validator: PasswordValidator.areEqual }
        )
      }
    );
  }
  createUser() {

    if (this.form.invalid) {
      this.util.showMsg('Hay campos que validar !!', MessageType.warning);
      FormUtils.MarkAsTouch(this.form);
      return;
    }
    // this.http.post<BaseMsg>(this.urls.userUrl, this.form.value).subscribe(me => {
    //   if (me.Error != null) {
    //     this.util.showMsg('Se produjo un error al crear su cuenta: ' + me.Error, MessageType.error);
    //   } else {
    //     this.util.showMsg('Su usuario se ha creado correctamente, revise su correo para activarlo');
    //     this.limpiarFormulario();
    //   }
    // });
  }

  limpiarFormulario() {
    this.newUser = new NewUser();
  }
  validUser() {
    if (this.form.get('nombre').invalid) {
      this.form.get('nombre').markAsTouched();
      return false;
    }
    if (this.form.get('email').invalid) {
      this.form.get('email').markAsTouched();
      return false;
    }
    if (this.form.get('idGenero').invalid) {
      this.form.get('idGenero').markAsTouched();
      return false;
    }
    if (this.form.get('pwd').invalid) {
      this.form.get('pwd').markAsTouched();
      return false;
    }
    if (this.form.get('confirmPwd').invalid) {
      this.form.get('confirmPwd').markAsTouched();
      return false;
    }
    // if (this.newUser.Empresas.length === 0) {
    //   this.alert.setMessage('Debe escoger la(s) empresa(s) para la(s) que realizará pedidos', 'warn');
    //   return false;
    // }
    return true;
  }
}
