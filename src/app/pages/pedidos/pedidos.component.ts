import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupName, FormControl, FormArray } from '@angular/forms';
import { CatalogUtils } from '../../utils/catalog.utils';
import { GlobalVariables } from '../../global';
import { FormUtils} from '../../utils/forms.utils';
import { MessageType } from '../../msg/alert.msg';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  form: FormGroup;
  displayedColumns: string[] = ['Producto', 'Subtotal'];
  constructor(
    private fb: FormBuilder,
    private catObj: CatalogUtils,
    public global: GlobalVariables,
    private util: FormUtils
  ) {
    global.setComponentTitle('Pedidos');
  }
  ngOnInit() {
    this.buidForm();
  }
  buidForm() {
    this.form = this.fb.group({
      fechaPedido: [new Date(), Validators.required],
      fechaEntrega: [undefined, Validators.required],
      total: 0,
      products: this.fb.array([], Validators.required)
    });
    this.fillProductCatalog();
  }
  createPedido() {
    if (this.form.invalid) {
      this.util.showMsg('Hay campos que validar !!', MessageType.warning);
      FormUtils.MarkAsTouch(this.form);
      return;
    }
    if (!this.existAOrder()) {
      this.util.showMsg('Debe Registrar al menos un pedido!!', MessageType.warning);
      return;
    }
    console.log(this.form.value);
  }
  existAOrder() {
    let ms = false;
    this.form.value.products.forEach(product => {
      if (product.Cantidad > 0) {
        ms = true;
      }
    });
    return ms;
  }
  fillProductCatalog() {
    this.catObj.catalog.ListProductoPedido.forEach(product => {
      (<FormArray>this.form.controls.products).push(
        this.fb.group({
          IdProductoPrecio: product.Id,
          Nombre: product.Nombre,
          Cantidad: [null, Validators.required],
          Precio: product.Precio,
          Subtotal: 0
        })
      );
    });
  }
  calcSubtotal(id) {
    const cantidad = this.form.controls.products['controls'][id].value.Cantidad;
    const precio = this.form.controls.products['controls'][id].value.Precio;
    const subtotal = cantidad * precio;
    this.form.controls.products['controls'][id].patchValue(
      { Subtotal: subtotal }
    );
    this.calcTotal();
  }
  calcTotal() {
    let _total = 0;
    this.form.value.products.forEach(product => {
      _total += product.Subtotal;
    });
    this.form.patchValue({total: _total});
  }
}

