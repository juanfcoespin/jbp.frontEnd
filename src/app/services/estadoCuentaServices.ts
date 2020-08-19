import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { Promotick, ConfMsg } from '../msg/confMsg';
import { EstadoCuentaMsg } from '../msg/estadoCuentaMsg';
import { PromotickServices } from './promotickServices';



@Injectable()
export class EstadoCuentaServices {
    
    estadoCuenta = new EstadoCuentaMsg();
    procesando: boolean;
    subscription: Subscription;
     
    constructor(
        private ptkService: PromotickServices
    ) {}
    
    consultarEstadoCuenta(ruc: string) {
        this.procesando=true;
        this.estadoCuenta.mensaje='Consultando al servicio web de promotick...';
        this.subscription =this.ptkService.getEstadoCuentaByRuc(ruc).subscribe(resp=>{
            this.procesando=false;
            this.estadoCuenta=resp;
            this.subscription.unsubscribe();
          });
    }
    
}
