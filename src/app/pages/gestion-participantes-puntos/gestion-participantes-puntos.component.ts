import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from '../../global';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith, debounceTime, isEmpty} from 'rxjs/operators';

import {
  ParticipantePuntosMsg,
  SocioNegocioItem
} from '../../msg/socioNegocioMsg';
import {MatRadioChange } from '@angular/material';
import {ItemMsg} from '../../msg/common.msg';

import {FormUtils} from '../../utils/forms.utils';
import { ArrayUtils } from '../../utils/arrayUtils';
import { SocioNegocioService } from '../../services/socioNegocioService';
import { GuardsCheckStart, Router } from '@angular/router';
import { MessageType } from 'src/app/msg/alert.msg';
import { UserService } from 'src/app/services/userService';

@Component({
  selector: 'app-gestion-participantes-puntos',
  templateUrl: './gestion-participantes-puntos.component.html',
  styleUrls: ['./gestion-participantes-puntos.component.css']
})
export class GestionParticipantesPuntosComponent implements OnInit {
  // controles de ingreso en la UI para búsqueda
  txtSearch = new FormControl();
  seEncontraroSN = false;
  lastParticipanteSelected: ParticipantePuntosMsg;
  generos: ItemMsg[];
  categorias: ItemMsg[];
  elite: boolean;
  TiposDocumento: ItemMsg[];
  form: FormGroup;
  // aqui se almacena el resultado de la consulta al servidor
  listSociosNegocio: SocioNegocioItem[] = [];
  vendedores: string[] = [];

  // aqui se almacena el resultado de la consulta en la busquedad del cliente
  filterSearchSocioNegocio: Observable<SocioNegocioItem[]>;
  filteredVendedor: Observable<string[]>;

  constructor(
    public global: GlobalVariables,
    private fb: FormBuilder,
    private utl: FormUtils,
    private snService: SocioNegocioService,
  ) {
      this.setTitulo();
      this.initForm();
      this.setGeneros();
      this.setCategorias();
      this.setTiposDocumento();
  }
  setTiposDocumento() {
    this.TiposDocumento = [
      {
        Id: 1,
        Nombre: 'Cédula'
      },
      {
        Id: 2,
        Nombre: 'Ruc'
      }
    ];
  }
  setCategorias() {
    this.categorias = [
      {
        Id: 1,
        Nombre: 'A'
      },
      {
        Id: 2,
        Nombre: 'B'
      }
    ];
  }
  setGeneros() {
    this.generos = [
      {
        Id: 1,
        Nombre: 'Masculino'
      },
      {
        Id: 2,
        Nombre: 'Femenino'
      }
    ];
  }
  initForm() {
    this.form = this.fb.group({
      Nombres: [null, Validators.required],
      Apellidos: [null],
      Email: [null, Validators.email],
      IdTipoDocumento: [null, Validators.required],
      NroDocumento: [null, Validators.required],
      NroDocumentoAnterior: [null],
      RucPrincipal: [null, Validators.required],
      Clave: [null, Validators.required],
      Activo: [false, Validators.required],
      FechaNacimiento: [null, Validators.required],
      Celular: [null],
      Telefono: [null],
      IdGenero: [null, [Validators.required, Validators.min(1)]],
      IdCatalogo: [null, Validators.required],
      Elite: [false, Validators.required],
      Vendedor: [null, Validators.required],
      CupoAnual: [null, Validators.required],
      Comentario: [null],
    });
  }
  setTitulo() {
    this.global.setComponentTitle('Gestión Participantes Puntos');
  }
  ngOnInit() {
    // se carga aqui porque puede tomar mas tiempo en la llamada asíncrona al servicio
    this.setVendedores();
  }
  setVendedores() {
    this.snService.getVendedores().subscribe(items => {
      this.vendedores = items;
      this.filteredVendedor = this.form.controls.Vendedor.valueChanges.pipe(
        startWith(''),
        map(value => this.filtrarVendedor(value))
      );
    });
  }
  filtrarVendedor(me: string): string[] {
    let ms: string[];
    ms = new Array();
    me = me.toLocaleLowerCase();
    const matrixToken = me.split(' ');
    for (const item of this.vendedores) {
      if (ArrayUtils.contieneTokens(item, matrixToken)) {
        ms.push(item);
      }
    }
    return ms;
  }
  
  buscarSocioNegocio() {
    this.snService.buscarSocioNegocio(this.txtSearch.value).
      subscribe(resp => { // se ejecuta cuando se tiene el resultado del servicio que corre de manera asincrona
        this.seEncontraroSN = (resp.length > 0);
        this.listSociosNegocio = Array.from(resp);
        this.mostrarResultadoBusqueda();
      });
  }
  mostrarResultadoBusqueda() {
    console.log(this.listSociosNegocio);
    this.filterSearchSocioNegocio = this.txtSearch.valueChanges.pipe(
      startWith(''),
      map(value => this.filtrarSocioNegocio(value))
    );
  }
  filtrarSocioNegocio(me: string): SocioNegocioItem[] {
    console.log('hola');
    console.log(me);
    let ms: SocioNegocioItem[];
    ms = new Array();
    const matrixToken = me.split(' ');
    for (const item of this.listSociosNegocio) {
      if (ArrayUtils.contieneTokens(item.Ruc + ': ' + item.Nombre, matrixToken)) {
        ms.push(item);
      }
    }
    return ms;
  }
  seleccionarSN(event: MatRadioChange) {
    this.snService.getParticipanteByRuc(event.value).subscribe(
      participante => {
        FormUtils.cleanForm(this.form);
        if (participante) {
          this.form.patchValue(participante);
          this.form.patchValue({NroDocumentoAnterior: participante.NroDocumento});
        }
      }
    );
  }
  guardar() {
    console.log(this.form.value);
    if (this.form.invalid) {
      this.utl.showMsg('Existen campos por validar!!', MessageType.warning);
      return;
    }
    this.snService.Save(this.form.value).subscribe(me => {
      if (me.Error) {
        console.log(me.Error);
        let msg = 'No se pudo guardar la Información del participante.\n';
        msg += 'Error:<br>' + me.Error;
        this.utl.showMsg(msg, MessageType.error);
        return;
      }
      this.utl.showMsg('Info del participante guardada con éxito');
    });
  }
}
