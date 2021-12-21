import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EntregaServices } from 'src/app/services/entregaServices';


@Component({
  selector: 'app-rpt-hoja-ruta',
  templateUrl: './rpt-hoja-ruta.component.html',
  styleUrls: ['./rpt-hoja-ruta.component.scss']
})
export class RptHojaRutaComponent implements OnInit {
  hojaRuta: any;
  marginLeft:string;
  marginTop:string;
  fechaImpresion:string;
  constructor(
    private entregaService: EntregaServices,
    private route: Router) { }

  ngOnInit() {
    this.hojaRuta=this.entregaService.hojaRuta;
    console.log(this.hojaRuta);
    if(this.hojaRuta.entregasSeleccionadas){
      this.marginTop=this.hojaRuta.entregasSeleccionadas[0].MargenSuperior;
      this.marginLeft=this.hojaRuta.entregasSeleccionadas[0].MargenIzquierdo;
      this.fechaImpresion=this.hojaRuta.entregasSeleccionadas[0].FechaImpresion;
    }
  }
  regresar(){
    this.route.navigateByUrl('hojaRuta');
  }
  
  print(){
    window.print();
  }
}
