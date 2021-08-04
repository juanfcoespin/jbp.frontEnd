import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MessageType } from 'src/app/msg/alert.msg';
import { EntregaServices } from 'src/app/services/entregaServices';
import { FormUtils } from 'src/app/utils/forms.utils';

@Component({
  selector: 'app-entregas-urbano',
  templateUrl: './entregas-urbano.component.html',
  styleUrls: ['./entregas-urbano.component.scss']
})
export class EntregasUrbanoComponent implements OnInit {
  form: FormGroup;
  bodegas: any[];
  entregas: any[];
  displayedColumns = ['Selected', 'NumFactura','Fecha', 'Cedula', 'Cliente'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: MatTableDataSource<Element>;
  constructor(
    private fb: FormBuilder,
    private entregaService: EntregaServices,
    private utl: FormUtils,
  ) {
    this.setBodegas();  
  }
  setBodegas(){
    this.bodegas=['PT1', 'PT2']
    // this.bodegas=[
    //   {
    //     "id":'PT1',
    //     "nombre":'Prod. Terminado Pifo'
    //   },
    //   {
    //     "id":'PT2',
    //     "nombre":'Prod. Terminado Puembo'
    //   }
    // ];
  }

  ngOnInit() {
    this.form = this.fb.group({
      fechaDesde: [new Date(), Validators.required],
      fechaHasta: [new Date(), Validators.required],
      bodega: [null, Validators.required],
    });
    //this.setDataSource(this.entregas);
    
  }
  getEntregas(){
    if(!this.validForm())
      return;
    this.entregaService.getEntregasUrbano(this.form.value).subscribe(entregas=>{
      //console.log(entregas);
      this.entregas=entregas;
      this.setDataSource(this.entregas);
    });
  }
  validForm(){
    let control=this.getControl("bodega");
    if(control.status=="INVALID"){
      control.markAsTouched();
      this.utl.showMsg('El Campo Bodega es requerido',MessageType.warning);
      return false;
    }
    return true;
  }
  getControl(controlName){
    return this.form.controls[controlName];
  }
  setDataSource(source){
    this.dataSource=new MatTableDataSource<Element>(source);
    this.dataSource.paginator = this.paginator;
  }
  selectAll(checked){
    this.entregas.forEach(entrega=>entrega.Selected=checked);
  }
  export(table, type){
    var selected=this.entregas.filter(e=>e.Selected);
    if(selected.length==0){
      this.utl.showMsg('Debe seleccionar al menos 1 registro a exportar!!', MessageType.warning);
      return;
    }
      
    this.setDataSource(selected);
    if(type=='excel')
      table.exportTable('xlsx', {fileName:'EntregaUrbano', sheet: 'sheet_name', Props: {Author: 'Talha'}});
    
    if(type=='csv')
      table.exportTable('csv');
  }
  onExportCompleted(){
    console.log('compleated');
    this.setDataSource(this.entregas);
  }

}
export interface Element {
  NumFactura: string;
  Fecha: string;
  Cedula: string;
  Cliente: string;
  Selected: boolean;
}


