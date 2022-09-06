import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BodegaServices } from 'src/app/services/bodegaServises';
import { MatTableDataSource } from '@angular/material';
import { StringUtils } from 'src/app/utils/stringUtils';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
  constructor(private route: ActivatedRoute, private bodegaService: BodegaServices) {

   }

  ngOnInit() {
    this.setLote();
  }
  setLote(){
    this.route.queryParams.subscribe(params => {
      if(params && params.lote)
        this.lote=params.lote;
        console.log(this.lote);
        this.consultarContenido(this.lote);
    });
  }
  consultarContenido(lote){
    this.bodegaService.getContenidoLote(lote).subscribe(me=>{
      this.detalleLote=me;
      if(me && me.UbicacionesCantidad){
        this.ubicaciones=new MatTableDataSource<Element>(me.UbicacionesCantidad);
        this.setEstado(me.UbicacionesCantidad);
      }
        
      console.log(this.detalleLote);
    });
  }
  setEstado(ubicaciones){
    ubicaciones.forEach(u => {
      if(StringUtils.contains(u.Ubicacion, 'CUAR')){
        this.estadoLote='CUARENTENA';
      }
      if(StringUtils.contains(u.Ubicacion, 'PT') || StringUtils.contains(u.Ubicacion, 'PICK')|| StringUtils.contains(u.Ubicacion, 'MAT')){
        this.estadoLote='LIBERADO';
      }
      if(StringUtils.contains(u.Ubicacion, 'RECH')){
        this.estadoLote='RECHAZADO';
      }
      if(StringUtils.contains(u.Ubicacion, 'BAJ')){
        this.estadoLote='BAJA';
      }
    });
  }
}
