import { Component, OnInit } from '@angular/core';
import {RetencionesServices } from '../../services/retencionesServices';
import {FormControl, Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import {StatusMsg, ItemCodeMsg} from '../../msg/common.msg';
import { ArrayUtils} from '../../utils/arrayUtils';
import { dateUtils} from '../../utils/dateUtils';
import {FormUtils} from '../../utils/forms.utils';
import { MessageType } from 'src/app/msg/alert.msg';


@Component({
  selector: 'app-envio-retenciones',
  templateUrl: './envio-retenciones.component.html',
  styleUrls: ['./envio-retenciones.component.scss']
})
export class EnvioRetencionesComponent implements OnInit {
  public statusObs: Observable<StatusMsg[]>;
  public  statusArr: StatusMsg[];
  displayedColumns: string[] = ['date', 'msg'];
  mesesRetencion: ItemCodeMsg[] = [];
  procesando: boolean;
  mesesControl = new FormControl(null, [Validators.required]);
  
  constructor(
    private retencionesServices: RetencionesServices,    
    private utl: FormUtils,
  ) {
    this.statusObs = new Observable<StatusMsg[]>();
    this.statusArr=[];
    this.setMesesRetencion();
  }

  ngOnInit() {
    this.retencionesServices.hubConnectedObs.subscribe(()=>{
      this.subscribeStatus();
    });
    this.setCurrentAndLastMonthByDefault();
    
  }
  setCurrentAndLastMonthByDefault() {
    const currentDate=new Date();
    const currentMonth=this.putCeroIfNeeded(currentDate.getMonth()+1); // hay que aumentarle uno ya que enero es empieza en 0
    if(currentMonth==='01'){
      this.mesesControl.setValue([currentMonth]);
    }
    else{
      const lastMonth=this.putCeroIfNeeded(currentDate.getMonth());
      this.mesesControl.setValue([lastMonth,currentMonth]);
    }
  }
  putCeroIfNeeded(me: number) {
    return (me<10)?'0'+me.toString():me.toString();
  }
  
  setMesesRetencion(){
    this.mesesRetencion=dateUtils.getMesesArray();
  }
  // aqui se muestran los mensajes del servidor
  subscribeStatus() {
    this.retencionesServices.statusObs.subscribe(status => {
      if(status){
        //console.log(status);
        if(status.msg.toLowerCase().includes('error') || 
          status.msg.toLowerCase().includes('no enviada')){
            status.msgColor=  'red';
        }else{
          status.msgColor=  'black';
        }
          
        this.statusArr.push(status);
        const statusOrdered = ArrayUtils.OrderByLastFirst(this.statusArr);
        this.statusObs = new Observable(obs => {
            obs.next(statusOrdered);
        });
      }
    });
  }
  enviarRetenciones() {
    if(this.mesesControl.hasError('required')){
      this.utl.showMsg('Existen campos por validar!!', MessageType.warning);
      this.mesesControl.markAsTouched();
      return;
    }
    this.procesando=true;
    this.retencionesServices.enviarRetenciones(this.mesesControl.value.toString())
    .subscribe(()=>this.procesando=false);
  }
}
