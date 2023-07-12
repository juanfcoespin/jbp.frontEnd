import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BodegaServices } from 'src/app/services/bodegaServises';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta-ubicacion',
  templateUrl: './consulta-ubicacion.component.html',
  styleUrls: ['./consulta-ubicacion.component.scss']
})
export class ConsultaUbicacionComponent implements OnInit {
  ubicacion: string;
  contenido: any[]=[];
  contenidoFiltrado: any[]=[];
  codBodegaSeleccionada: string;
  codBodegas: any[]=[];
  displayedColumns: string[] = ['Lote', 'CodBodega', 'CodArticulo', 'Articulo', 'Cantidad'];
  constructor(private route: ActivatedRoute, private router: Router, private bodegaService: BodegaServices) { }

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
      if(me && me.Items)
        this.contenido=me.Items;
        this.codBodegas=[];
        this.contenido.forEach(item=>{
          if(!this.codBodegas.includes(item.CodBodega))
            this.codBodegas.push(item.CodBodega);
        });
    });
  }
  seleccionarBodega(codBodega){
    this.contenidoFiltrado=[];
    this.contenido.forEach(item=>{
      if(item.CodBodega==codBodega)
      this.contenidoFiltrado.push(item);
    });
  }
  verDetalleLote(lote){
    this.router.navigate(['consultaLote'], { queryParams: {lote: lote, regresar:1}});
  }

}
