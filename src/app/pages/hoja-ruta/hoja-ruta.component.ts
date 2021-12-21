import { ThrowStmt } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { MessageType } from 'src/app/msg/alert.msg';
import { EntregaServices } from 'src/app/services/entregaServices';
import { TransportistaService } from 'src/app/services/transportistaService';
import { FormUtils } from 'src/app/utils/forms.utils';
import { StringUtils } from 'src/app/utils/stringUtils';

@Component({
  selector: 'app-hoja-ruta',
  templateUrl: './hoja-ruta.component.html',
  styleUrls: ['./hoja-ruta.component.scss']
})
export class HojaRutaComponent implements OnInit {
  form: FormGroup;
  transportistas: any[];
  entregas: any[];
  procesando: boolean=false;
  lugares: any[]=['PIFO', 'PUEMBO'];
  displayedColumns = ['Selected','Cliente', 'NumFactura', 'Fecha','Bodega', 'CantBultos', 'Transporte', 'Ciudad', 'Observaciones', 'NumeroGuia'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: MatTableDataSource<Element>;
  constructor(
    private fb: FormBuilder,
    private entregaService: EntregaServices,
    private utl: FormUtils,
    private transportistaService: TransportistaService,
    private route: Router
  ) {
   }

  ngOnInit() {
    this.form = this.fb.group({
      fechaDesde: [new Date(), Validators.required],
      fechaHasta: [new Date(), Validators.required],
      //nroHojaRuta: [null, Validators.required],
      lugar: [null, Validators.required],
    });
    this.setHojaRutaSeleccionada();
  }
  setHojaRutaSeleccionada(){
    if(this.entregaService.hojaRuta){
      let hr=this.entregaService.hojaRuta;
      this.form.setValue({
        //"nroHojaRuta": hr.nroHojaRuta,
        "lugar": hr.lugar,
        "fechaDesde": hr.fechaDesde,
        "fechaHasta": hr.fechaHasta,
      });
      this.entregas=hr.entregas;
      this.establecerEntregasSeleccionadas(hr.entregasSeleccionadas)
      this.setDataSource(this.entregas);
    }
  }
  establecerEntregasSeleccionadas(entregasSeleccionadas){
    if(this.entregas && entregasSeleccionadas){
      this.entregas.forEach(entrega=>{
        entregasSeleccionadas.forEach(es => {
          if(entrega.key==es.key){
            entrega.selected=true;
          }
        });
      });
    }
  }
  getEntregas(){
    if(!this.validForm())
      return;
    this.procesando=true;
    this.entregaService.getHojaRuta(this.form.value).subscribe(entregas=>{
      this.procesando=false;
      if(entregas){
        this.entregas=entregas;
        this.setUnicKeyEnEntregas()
        this.setDataSource(this.entregas);
      }
    });
  }
  setUnicKeyEnEntregas(){
    this.entregas.forEach(entrega=>{
      entrega.key=StringUtils.getUnicKey();
    });
  }
  validForm(){
    let control=this.getControl("lugar");
    if(control.status=="INVALID"){
      control.markAsTouched();
      this.utl.showMsg('El lugar es requerido',MessageType.warning);
      return false;
    }
    //descomentar cuando ya no haya preimpresos
    /*control=this.getControl("nroHojaRuta");
    if(control.status=="INVALID"){
      control.markAsTouched();
      this.utl.showMsg('Debe Seleccionar el nro de hoja de ruta',MessageType.warning);
      return false;
    }*/
    
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
  generarHojaRuta(){
    var selected=this.entregas.filter(e=>e.Selected);
    if(selected.length==0){
      this.utl.showMsg('Debe seleccionar al menos 1 registro!!', MessageType.warning);
      return;
    }
    let hojaRuta;
    hojaRuta={};
    hojaRuta.entregas=this.entregas;
    hojaRuta.fechaDesde=this.getControlValue('fechaDesde');
    hojaRuta.fechaHasta=this.getControlValue('fechaHasta');
    hojaRuta.transportista=this.getTransportistByCod(hojaRuta.codTransportista);
    hojaRuta.lugar=this.getControlValue('lugar');
    hojaRuta.fecha=StringUtils.getCurrentDate();
    hojaRuta.entregasSeleccionadas=selected;
    //hojaRuta.nroHojaRuta=this.getControlValue('nroHojaRuta');
    this.entregaService.hojaRuta=hojaRuta;
    this.route.navigateByUrl('rptHojaRuta');
    
  }
  getControlValue(controlName){
    let control=this.getControl(controlName);
    if(control)
      return control.value;
    return null;
  }
  getTransportistByCod(codTransportista){
    if(this.transportistas){
      let obj=this.transportistas.find(p=>p.Id==codTransportista);
      if(obj)
        return obj.Nombre;
    }
    return null;
  }

}

export interface Element {
  Selected: boolean;
  Cliente: string;
  NumFactura: string;
  Fecha: string;
  CantBultos: number;
  Transporte: string;
  Ciudad: string;
  Observaciones: string;
  NumeroGuia: string;
}
