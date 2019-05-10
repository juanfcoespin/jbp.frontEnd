import { Component, OnInit } from '@angular/core';
import { BasePage } from '../basePage';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { ItemMsg } from 'src/app/msg/common.msg';
import { PeriodoService } from 'src/app/services/periodoServices';
import { FormUtils } from 'src/app/utils/forms.utils';
import { MessageType } from 'src/app/msg/alert.msg';
import { Observable } from 'rxjs';
import { ArrayUtils } from 'src/app/utils/arrayUtils';
import { startWith, map } from 'rxjs/operators';
import { CuentaService } from 'src/app/services/cuentaServices';


@Component({
  selector: 'app-update-montos-cuentas',
  templateUrl: './update-montos-cuentas.component.html',
  styleUrls: ['./update-montos-cuentas.component.css']
})
export class UpdateMontosCuentasComponent extends BasePage implements OnInit  {
  periodos: ItemMsg[] = [];
  filteredPeriodo: Observable<ItemMsg[]>;
  constructor(
    private utl: FormUtils,
    private fb: FormBuilder,
    private periodoServices: PeriodoService,
    private cuentaServices: CuentaService) {
    super('Procesar Monto Cuenta');
    this.initForm();
  }
  initForm() {
    this.form = this.fb.group({
      Periodo: [null, Validators.required]
    });
  }
  ngOnInit() {
    this.setPeriodos();
    this.cuentaServices.getList().subscribe(item => console.log(item));
  }
  displayPeriodo(me: ItemMsg) {
    return me ? me.Nombre : '';
  }
  setPeriodos() {
      this.periodoServices.getPeriodos().subscribe(me => {
        if (me.Error !== null) {
          this.utl.showMsg(me.Error, MessageType.error);
        } else {
          this.periodos = Array.from(me.List);
          this.filteredPeriodo = this.form.controls.Periodo.valueChanges.pipe(
            startWith(''),
            map(value => this.filtrarPeriodo(value))
          );
        }
      });
  }
  filtrarPeriodo(me: string): ItemMsg[] {
    let ms: ItemMsg[];
    if (typeof me !== 'string') {
      return ms;
    }
    ms = new Array();
    me = me.toLowerCase();
    const matrixToken = me.split(' ');
    for (const item of this.periodos) {
      if (ArrayUtils.contieneTokens(item.Nombre, matrixToken)) {
        ms.push(item);
      }
    }
    return ms;
  }
  procesar() {
    if (!this.form.valid) {
      this.utl.showMsg('Hay campos por validar!!', MessageType.warning);
    }
    console.log(this.form.value);
  }
}
