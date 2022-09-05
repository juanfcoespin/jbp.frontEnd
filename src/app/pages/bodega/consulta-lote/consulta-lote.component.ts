import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BodegaServices } from 'src/app/services/bodegaServises';
import { MatTableDataSource } from '@angular/material';

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
      if(me && me.UbicacionesCantidad)
        this.ubicaciones=new MatTableDataSource<Element>(me.UbicacionesCantidad);
      console.log(this.detalleLote);
    });
  }
}
