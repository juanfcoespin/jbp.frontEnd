import { Injectable } from '@angular/core';
import { RespAuthMsg } from './msg/loginMsg';
import { CatalogoMsg } from './msg/catalogo.msg';


@Injectable()
export class UrlServices {
    // Desarrollo
    // static userUrl = 'http://jbpservices/api/user';
    // static SocioNegocioUrl = 'http://jbpservices/api/socioNegocio';
    // static periodoUrl = 'http://jbpservices/api/periodo';
    // static cuentaUrl = 'http://jbpservices/api/cuenta';
    // static signalRUrl = 'http://localhost:5000/notify';

    // Produccion
    static userUrl = 'http://services.jbp.com.ec/api/user';
    static SocioNegocioUrl = 'http://services.jbp.com.ec/api/socioNegocio';
    static periodoUrl = 'http://services.jbp.com.ec/api/periodo';
    static cuentaUrl = 'http://services.jbp.com.ec/api/cuenta';
    static signalRUrl = 'http://localhost:5000/notify';
    static promotickServiceHubUrl = 'http://localhost:5000/logPromotickServiceHub';
    static promotickServiceUrl = 'http://jbpservices/api/facturaPromotick';
}

@Injectable()
export class GlobalVariables {
    static UserLogged: RespAuthMsg;
    ComponentTitle: string;
    NombreEmpresa = 'James Brown Pharma';
    constructor() {}
    public setComponentTitle(componentName: string) {
        this.ComponentTitle = this.NombreEmpresa + ' - ' + componentName;
    }
}
