import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BodegaServices } from 'src/app/services/bodegaServises';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-consulta-ubicacion',
  templateUrl: './consulta-ubicacion.component.html',
  styleUrls: ['./consulta-ubicacion.component.scss']
})
export class ConsultaUbicacionComponent implements OnInit {
  ubicacion: string;
  contenido: MatTableDataSource<Element>;
  displayedColumns: string[] = ['Lote', 'CodBodega', 'CodArticulo', 'Articulo', 'Cantidad'];
  constructor(private route: ActivatedRoute, private bodegaService: BodegaServices) { }

  ngOnInit() {
    this.setUbicacion();
  }
  setUbicacion(){
    this.route.queryParams.subscribe(params => {
      if(params && params.ubicacion)
        this.ubicacion=params.ubicacion;
        this.consultarContenido(this.ubicacion);
    });
  }
  consultarContenido(ubicacion){
    this.bodegaService.getContenidoUbicacion(ubicacion).subscribe(me=>{
      console.log(me);
      if(me && me.Items)
        this.contenido=new MatTableDataSource<Element>(me.Items);
      console.log(this.contenido);
    });
  }

}
