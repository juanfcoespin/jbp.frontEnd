import { Component, OnInit, Input } from '@angular/core';
import { EstadoCuentaMsg } from 'src/app/msg/estadoCuentaMsg';
import { PromotickServices } from 'src/app/services/promotickServices';
import { SocioNegocioService } from 'src/app/services/socioNegocioService';


@Component({
  selector: 'app-estado-cuenta-ptk',
  templateUrl: './estado-cuenta-ptk.component.html',
  styleUrls: ['./estado-cuenta-ptk.component.scss']
})
export class EstadoCuentaPtkComponent implements OnInit {
  @Input()
  participante: any;
  documentosPorMes: any[];
  metaMensual:number;
  estadoCuenta:EstadoCuentaMsg=new EstadoCuentaMsg();
  procesando:boolean=false;
  constructor(
      private socioNegocioService: SocioNegocioService, 
      private ptkService: PromotickServices) {
    this.documentosPorMes=[];
    this.socioNegocioService.onSocioNegocioSelected().subscribe(ruc=>{
      console.log(ruc);
      this.consultarEstadoCuentaByRuc(ruc);
    });
    
   }

  ngOnInit() {
   this.loadDocumentosParticipante();
  }
  consultarEstadoCuentaByRuc(ruc){
    this.procesando=true;
    let call=this.ptkService.getEstadoCuentaByRuc(ruc).subscribe(resp=>{
      call.unsubscribe();
      this.procesando=false;
      
      this.estadoCuenta=JSON.parse(resp);
      console.log(this.estadoCuenta);
      console.log(this.estadoCuenta.mensaje);
    });
  }
  loadDocumentosParticipante(){
    this.consultarEstadoCuentaByRuc(this.participante.RucPrincipal);
    console.log(this.participante);
    this.metaMensual=this.participante.metaAnual/12;
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
         obj.paraCumplirMeta=this.getMontoRestante(obj.monto);
         obj.puntos+= Number(d.puntos);
         obj.cumpleMetaMes=this.cumpleMetaMes(obj.monto);
         obj.documentos.push(d);
       }
     });
   });
  }
  getMontoRestante(monto){
    let diferencia=this.metaMensual-monto;
    if(diferencia<0)
      return 0;
    return diferencia;
  }
  cumpleMetaMes(monto){
    return (monto>=this.metaMensual);
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
