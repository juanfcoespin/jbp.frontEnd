import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageType } from 'src/app/msg/alert.msg';
import { UserService } from 'src/app/services/userService';
import { FacturaServices } from 'src/app/services/facturaServices';
import { FormUtils } from 'src/app/utils/forms.utils';

@Component({
  selector: 'app-update-num-factura-exportacion',
  templateUrl: './update-num-factura-exportacion.component.html',
  styleUrls: ['./update-num-factura-exportacion.component.scss']
})
export class UpdateNumFacturaExportacionComponent implements OnInit {
  form: FormGroup;
  nombreUsuario: string;
  constructor(
    private fb: FormBuilder,
    private facturaService: FacturaServices,
    private utl: FormUtils,
    private userService: UserService
  ) {
    userService.currentUser.subscribe(usr => {
    if(usr)
        this.nombreUsuario=usr.Nombre;
    });

   }

  ngOnInit() {
    this.form = this.fb.group({
      DocNum: [null, Validators.required],
      FolioNum: [null, Validators.required],
      Actualizador:[null]
    });
  }
  updateNumFacturaExportacion(){
    if(this.form.invalid){
      this.utl.showMsg("Hay campos por validar!!",MessageType.warning);
      FormUtils.MarkAsTouch(this.form);
      return;
    }
      
    this.form.patchValue({Actualizador: this.nombreUsuario});
    this.facturaService.setNumFacturaExportacion(this.form.value).subscribe(resp=>{
    if(resp=='ok')
      this.utl.showMsg("Se actualizó el número de factura correctamente")
    else
      this.utl.showMsg(resp,MessageType.warning);
    });

  }

}
