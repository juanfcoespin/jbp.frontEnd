import { getTreeNoValidDataSourceError } from '@angular/cdk/tree';
import { Component,  OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog,  MatPaginator, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { MessageType } from 'src/app/msg/alert.msg';
import { FacturaServices } from 'src/app/services/facturaServices';
import { SocioNegocioService } from 'src/app/services/socioNegocioService';
import { FormUtils } from 'src/app/utils/forms.utils';
import { ClientesEncontradosDialogComponent } from '../clientes-encontrados-dialog/clientes-encontrados-dialog.component';

@Component({
  selector: 'app-rpt-facturas-historicas',
  templateUrl: './rpt-facturas-historicas.component.html',
  styleUrls: ['./rpt-facturas-historicas.component.scss']
})
export class RptFacturasHistoricasComponent implements OnInit {
  form: FormGroup;
  procesando: boolean;
  years: number[];
  facturas: any[];
  clientes: any[];
  rucSeleccionado: string;
  displayedColumns: string[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: MatTableDataSource<Element>;
  constructor(private utl: FormUtils, private fb: FormBuilder, 
      private facturaSerivice: FacturaServices, private socioNegocioService: SocioNegocioService,
      public dialog: MatDialog
  ) {
    this.years=[2019,2018,2017,2016,2015];
    this.displayedColumns = [
      'Selected','fecha','ruc', 'cliente', 'numFactura', 
      'codOrden', 'autorizacionSRI', 'total',
    'descuento','impuesto','vendedor',
    'comentario','producto','lote',
    'cantidad','precioUnitario','subtotalLinea'
  ];
  }

  ngOnInit() {
    this.form = this.fb.group({
      year: [2019, Validators.required],
      ruc: [null],
      tipoConsulta: ['cliente', Validators.required],
      cliente: [null],
    });
  }
  getFacturas(){
      this.procesando=true;
      this.facturaSerivice.getFacturasHistoricas(this.form.value).subscribe(resp=>{
        this.facturas=[];
        if(resp){
          if(resp.error)
            this.utl.showMsg(resp.error, MessageType.error);
          else{
            this.facturas=resp.facturas;
          }
        }
        this.setDataSource(this.facturas);
        this.procesando=false;
      },error=>{
        this.procesando=false;
        this.utl.showMsg(error,MessageType.error);
      });
  }
  consultar(){
    if(this.validForm()){
      if(this.form.value.tipoConsulta=='ruc' && this.validRuc())
        this.getFacturas();
      if(this.form.value.tipoConsulta=='cliente')
        this.getClientes();
    }
  }
  validRuc(){
    if(this.form.value.ruc.includes(' ')){
      this.utl.showMsg("Ruc ingresado incorrecto!!", MessageType.warning);
      return false;
    }
    return true;
  }
  getClientes(){
    this.procesando=true;
    this.socioNegocioService.getHistoricoClientes(this.form.value.cliente).subscribe(resp=>{
      if(resp.error){
        this.procesando=false;
        this.utl.showMsg(resp.error, MessageType.warning);
      }else{
        this.clientes=resp.clientes;
        console.log(this.clientes);
        this.openDialog();
      }
    },error=>{
      this.procesando=false;
      this.utl.showMsg(error,MessageType.error);
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ClientesEncontradosDialogComponent, {
      width: '500px',
      data: {clientes: this.clientes, rucSeleccionado: this.rucSeleccionado},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.rucSeleccionado = result;
      console.log(this.rucSeleccionado);
      this.form.value.ruc=this.rucSeleccionado;
      this.procesando=false;
      this.getFacturas();
    });
  }
  validForm(){
    if(!this.form.valid){
      this.utl.showMsg("Hay campos por validar!!", MessageType.warning);
      return false;
    }
    if(this.form.value.tipoConsulta=='ruc' && !this.form.value.ruc){
      this.utl.showMsg("Debe registrar el ruc!!", MessageType.warning);
      return false;
    }
    if(this.form.value.tipoConsulta=='cliente' && !this.form.value.cliente){
      this.utl.showMsg("Debe registrar el cliente!!", MessageType.warning);
      return false;
    }
    return true;
  }
  export(table, type){
    console.log(table);
    var selected=this.facturas.filter(e=>e.Selected);
    if(selected.length==0){
      this.utl.showMsg('Debe seleccionar al menos 1 registro a exportar!!', MessageType.warning);
      return;
    }
      
    this.setDataSource(selected);
    if(type=='excel'){
      const excelName='Facturas_'+this.form.value.ruc;
      table.exportTable('xlsx', {fileName: excelName, sheet: 'facturas', Props: {Author: 'AppJB'}});
    }
    if(type=='csv')
      table.exportTable('csv');
  }
  setDataSource(source){
    this.dataSource=new MatTableDataSource<Element>(source);
    this.dataSource.paginator = this.paginator;
  }
  selectAll(checked){
    this.facturas.forEach(fact=>fact.Selected=checked);
  }

}
export interface Element {
  fecha: string;
  ruc: string;
  cliente: string;
  numFactura: string;
  Selected: boolean;
  autorizacionSRI: string;
  codOrden: string;
  total: number;
  descuento: number;
  impuesto: number;
  vendedor: string;
  comentario: string;
  producto: string;
  lote: string;
  cantidad: number;
  precioUnitario: number;
  subtotalLinea: number;
}



