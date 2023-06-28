import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BodegaServices } from 'src/app/services/bodegaServises';
import { MatTableDataSource } from '@angular/material';
import { StringUtils } from 'src/app/utils/stringUtils';
import { Location } from '@angular/common'

@Component({
  selector: 'app-consulta-lote',
  templateUrl: './consulta-lote.component.html',
  styleUrls: ['./consulta-lote.component.scss']
})
export class ConsultaLoteComponent implements OnInit {
  lote: string;
  detalleLote: any;
  ubicaciones: MatTableDataSource<Element>;
  displayedColumns: string[] = ['Ubicacion', 'Cantidad'];
  estadoLote: string;
  mostrarRegresar:boolean=false;

  constructor(
    private route: ActivatedRoute,
    private location: Location, 
    private bodegaService: BodegaServices) {}

  ngOnInit() {
    this.setLote();
  }
  setLote(){
    this.route.queryParams.subscribe(params => {
      if(params){
        if(params.lote){
          this.lote=params.lote;
          this.consultarContenido(this.lote);
        }
        if(params.regresar){
          this.mostrarRegresar=true;
        }
      }
    });
  }
  consultarContenido(lote){
    this.bodegaService.getContenidoLote(lote).subscribe(me=>{
      this.detalleLote=me;
      if(me && me.UbicacionesCantidad){
        this.ubicaciones=new MatTableDataSource<Element>(me.UbicacionesCantidad);
        this.setEstado(me.Estado);
        this.detalleLote.cantTotal=0;
        console.log(me);
        if(me.UbicacionesCantidad){
          me.UbicacionesCantidad.forEach(uc => {
            console.log(uc.Cantidad);
            this.detalleLote.cantTotal+=uc.Cantidad;
          });
        }
        this.detalleLote.cantTotal=this.detalleLote.cantTotal.toFixed(2);
      }
    });
  }
  setEstado(estado){
    //TODO: ver como gestionar el estado de baja
    switch(estado){
      case 'Liberado':
        this.estadoLote='LIBERADO';
        break;
      case 'Acceso Denegado':
        this.estadoLote='CUARENTENA';
        break;
      case 'Bloqueado':
        this.estadoLote='RECHAZADO';
        break;
    }
    console.log(this);
    console.log(this.detalleLote);
  }
  regresar(){
    this.location.back();
  }
}
