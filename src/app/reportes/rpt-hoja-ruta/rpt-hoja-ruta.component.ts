import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jsPDF } from "jspdf";


import { EntregaServices } from 'src/app/services/entregaServices';


@Component({
  selector: 'app-rpt-hoja-ruta',
  templateUrl: './rpt-hoja-ruta.component.html',
  styleUrls: ['./rpt-hoja-ruta.component.scss']
})
export class RptHojaRutaComponent implements OnInit {
  hojaRuta: any;
  constructor(
    private entregaService: EntregaServices,
    private route: Router) { }

  ngOnInit() {
    console.log(this.entregaService.hojaRuta);
    this.hojaRuta=this.entregaService.hojaRuta;
  }
  regresar(){
    this.route.navigateByUrl('hojaRuta');
  }
  print(hideSecction){
    let toHide=document.getElementById(hideSecction);
    toHide.style.display='none';
    let resp=window.print();
    console.log(resp);
    toHide.style.display='inline';
  }
}
