import { Component, OnInit } from '@angular/core';
import { EstadoCuentaServices } from 'src/app/services/estadoCuentaServices';

@Component({
  selector: 'app-estado-cuenta-ptk',
  templateUrl: './estado-cuenta-ptk.component.html',
  styleUrls: ['./estado-cuenta-ptk.component.scss']
})
export class EstadoCuentaPtkComponent implements OnInit {

  constructor(
    public estadoCuentaServices: EstadoCuentaServices
  ) { }

  ngOnInit() {
    //this.estadoCuentaServices.estadoCuenta.data.canjes
  }

}
