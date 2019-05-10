import { Component, OnInit } from '@angular/core';
import { DirectorioTelefonicoService} from '../../services/directorioTelefonicoServices';
import {DirectorioMsg} from '../../msg/directorioMsg';
import { GlobalVariables } from '../../global';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {map, startWith, debounceTime, isEmpty} from 'rxjs/operators';
import { ArrayUtils } from '../../utils/arrayUtils';
import { StringUtils } from '../../utils/stringUtils';

@Component({
  selector: 'app-directorio-telefonico',
  templateUrl: './directorio-telefonico.component.html',
  styleUrls: ['./directorio-telefonico.component.css']
})
export class DirectorioTelefonicoComponent implements OnInit {
  // controles de ingreso en la UI para búsqueda
  txtSearch = new FormControl();
  displayedColumns: string[] = ['CONTACTO', 'Ext', 'DEPARTAMENTO', 'PLANTA'];
  contactos: DirectorioMsg[] = [];
  contactosFiltered: Observable<DirectorioMsg[]>;
  constructor(
    private directorioService: DirectorioTelefonicoService,
    public global: GlobalVariables,) {
      this.setTitulo();
    }

  ngOnInit() {
    this.cargarContactos();
    const tmp = 'MÉDICO';
    console.log(tmp);
    console.log(StringUtils.quitarTildes(tmp));

  }
  setTitulo() {
    this.global.setComponentTitle('Directorio Telefónico');
  }
  cargarContactos() {
    this.directorioService.getDirectorio().subscribe(contactos => {
      this.contactos = Array.from(contactos);
      this.mostrarResultadoBusqueda();
    });
  }
  mostrarResultadoBusqueda(){
    this.contactosFiltered = this.txtSearch.valueChanges.pipe(
      startWith(''),
      map(value => this.filtrarContacto(value))
    );
  }
  filtrarContacto(me: string): DirectorioMsg[] {
    let ms: DirectorioMsg[];
    ms = new Array();
    if (me) {
      me = me.toLocaleLowerCase();
    }
    const matrixToken = me.split(' ');
    for (const item of this.contactos) {
      if (ArrayUtils.contieneTokens(item.CONTACTO + ' ' + item.DEPARTAMENTO + ' ' + item.PLANTA, matrixToken)) {
        ms.push(item);
      }
    }
    return ms;
  }
}
