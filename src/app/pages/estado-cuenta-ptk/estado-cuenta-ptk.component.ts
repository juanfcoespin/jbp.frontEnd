import { Component, OnInit, Input } from '@angular/core';
import { EstadoCuentaServices } from 'src/app/services/estadoCuentaServices';

@Component({
  selector: 'app-estado-cuenta-ptk',
  templateUrl: './estado-cuenta-ptk.component.html',
  styleUrls: ['./estado-cuenta-ptk.component.scss']
})
export class EstadoCuentaPtkComponent implements OnInit {
  @Input()
  participante: any;
  documentosPorMes: any[];
  constructor(
    public estadoCuentaServices: EstadoCuentaServices
  ) {
    this.documentosPorMes=[];
   }

  ngOnInit() {
     this.participante.documentos.forEach(d => {
       let mes=d.mesDocumento;
      if(!this.existeMes(mes)){//agrego el mes en el arreglo
        let obj:any ={};
        obj.mes=mes;
        obj.documentos=[];
        obj.monto=0;
        obj.puntos=0;
        this.documentosPorMes.push(obj);
      }
      this.documentosPorMes.forEach(obj=>{
        if(obj.mes==mes){
          obj.monto+= Number(d.monto);
          obj.puntos+= Number(d.puntos);
          obj.documentos.push(d);
        }
      });
    });
    console.log(this.documentosPorMes);

  }
  existeMes(mes){
    if(this.documentosPorMes.length==0)
      return false;
    for(let obj of this.documentosPorMes){
      if(obj.mes==mes)
        return true;
    }
    return false;
  }


}
