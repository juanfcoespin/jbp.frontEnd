import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MessageType } from 'src/app/msg/alert.msg';
import { ReaccionesServices } from 'src/app/services/reaccionesServices';
import { FormUtils } from 'src/app/utils/forms.utils';

@Component({
  selector: 'app-rpt-reacciones',
  templateUrl: './rpt-reacciones.component.html',
  styleUrls: ['./rpt-reacciones.component.scss']
})
export class RptReaccionesComponent implements OnInit {
  reacciones: any[]=[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: MatTableDataSource<Element>;

  constructor(private reaccionesService:ReaccionesServices, private utl: FormUtils) { }
  
  displayedColumns = [
    'Selected', 'fechaRegistro', 'nombres', 'apellidos', 'sexo', 
    'rangoEdad', 'pesoKg', 'alturaCm', 'quienPadecioReaccion', 'padeceOtraEnfermedad'
  ];
  ngOnInit() {
    this.getReacciones();
  }
  refrescar(){
    this.getReacciones();
  }
  getReacciones(){
    this.reaccionesService.getReacciones().subscribe(reacciones=>{
      console.log(reacciones);
      if(reacciones)
        this.reacciones=reacciones;
        this.setDataSource(this.reacciones);
    });
  }
  setDataSource(source){
    this.dataSource=new MatTableDataSource<Element>(source);
    this.dataSource.paginator = this.paginator;
  }
  selectAll(checked){
    this.reacciones.forEach(item=>item.Selected=checked);
  }
  export(table, type){
    var selected=this.reacciones.filter(e=>e.Selected);
    if(selected.length==0){
      this.utl.showMsg('Debe seleccionar al menos 1 registro a exportar!!', MessageType.warning);
      return;
    }
      
    this.setDataSource(selected);
    if(type=='excel')
      table.exportTable('xlsx', {fileName:'ReaccionesMedicamentos', sheet: 'sheet_name', Props: {Author: 'Talha'}});
    
    if(type=='csv')
      table.exportTable('csv');
  }
  onExportCompleted(){
    console.log('compleated');
    this.setDataSource(this.reacciones);
  }
}
