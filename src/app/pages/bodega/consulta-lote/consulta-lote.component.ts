import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BodegaServices } from 'src/app/services/bodegaServises';
import { Location } from '@angular/common'

@Component({
  selector: 'app-consulta-lote',
  templateUrl: './consulta-lote.component.html',
  styleUrls: ['./consulta-lote.component.scss']
})
export class ConsultaLoteComponent implements OnInit {
  lote: string;
  detalleLote: any;
  estadoLote: string;
  mostrarRegresar:boolean=false;
  esProductoTerminado:boolean;

  constructor(
    private route: ActivatedRoute,
    private location: Location, 
    private bodegaService: BodegaServices) {}

  ngOnInit() {
    this.setLote();
  }
  setLote(){
    this.route.queryParams.subscribe(params => {
      console.log(params);
      if(params){
        if(params.lote){
          this.lote=params.lote;
          var codArticulo=null;
          if(params.codArticulo)
            codArticulo=params.codArticulo;
          this.consultarContenido(this.lote, codArticulo);
        }
        if(params.regresar){
          this.mostrarRegresar=true;
        }
      }
    });
  }
  consultarContenido(lote, codArticulo=null){
    console.log(lote);
    console.log(codArticulo);
    this.bodegaService.getContenidoLote(lote, codArticulo).subscribe(me=>{
      this.detalleLote=me;
      console.log(me);
      if(this.detalleLote && this.detalleLote.EsPT){
        this.esProductoTerminado = this.detalleLote.EsPT
        console.log(this.esProductoTerminado);
      }
      if(me && me.UbicacionesCantidad){
        this.setEstado(me.Estado);
      }
    });
  }
  setEstado(estado){
    //TODO: ver como gestionar el estado de baja
    switch(estado){
      case 'Liberado':
        this.estadoLote='APROBADO';
        break;
      case 'Acceso Denegado':
        this.estadoLote='CUARENTENA';
        break;
      case 'Bloqueado':
        this.estadoLote='RECHAZADO';
        break;
    }
  }
  regresar(){
    this.location.back();
  }
}
