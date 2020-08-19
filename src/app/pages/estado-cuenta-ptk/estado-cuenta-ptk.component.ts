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
  constructor(
    public estadoCuentaServices: EstadoCuentaServices
  ) { }

  ngOnInit() {
    //this.estadoCuentaServices.estadoCuenta.data.canjes
  }

}
