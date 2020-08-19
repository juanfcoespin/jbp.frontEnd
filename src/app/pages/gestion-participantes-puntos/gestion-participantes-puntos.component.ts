import { Component, OnInit, ɵConsole } from '@angular/core';
import { GlobalVariables } from '../../global';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
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
import { PromotickServices } from 'src/app/services/promotickServices';
import {EstadoCuentaServices } from '../../services/estadoCuentaServices';
import { DocumentosEnviadosServices } from 'src/app/services/documentosEnviadosServices';

@Component({
  selector: 'app-gestion-participantes-puntos',
  templateUrl: './gestion-participantes-puntos.component.html',
  styleUrls: ['./gestion-participantes-puntos.component.scss']
})
export class GestionParticipantesPuntosComponent implements OnInit {
  // controles de ingreso en la UI para búsqueda
  txtSearch = new FormControl();
  procesando=false;
  seSeleccionoSocioNegocio=false;
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
    private ptkService: PromotickServices,
    private estadoCuentaService: EstadoCuentaServices,
    private documentosEnviadosService: DocumentosEnviadosServices
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
      nombres: [null, Validators.required],
      apellidos: [null],
      email: [null, Validators.email],
      tipoDocumento: [null, Validators.required],
      nroDocumento: [null, Validators.required],
      NroDocumentoAnterior: [null],
      RucPrincipal: [null, Validators.required],
      clave: [null, Validators.required],
      Activo: [false, Validators.required],
      FechaNacimiento: [Validators.required],
      celular: [null],
      telefono: [null],
      tipoGenero: [null, [Validators.required, Validators.min(1)]],
      idCatalogo: [null, Validators.required],
      Elite: [false, Validators.required],
      vendedor: [null, Validators.required],
      metaAnual: [null, Validators.required],
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
      this.filteredVendedor = this.form.controls.vendedor.valueChanges.pipe(
        startWith(''),
        map(value => this.filtrarVendedor(value))
      );
    });
  }
  filtrarVendedor(me: string): string[] {
    let ms: string[];
    ms = new Array();
    if (me) {
      me = me.toLocaleLowerCase();
      const matrixToken = me.split(' ');
      for (const item of this.vendedores) {
        if (ArrayUtils.contieneTokens(item, matrixToken)) {
          ms.push(item);
        }
      }
    }
    return ms;
  }
  buscarSocioNegocio() {
    this.procesando=true;
    this.seSeleccionoSocioNegocio=false;
    this.snService.buscarSocioNegocio(this.txtSearch.value).
      subscribe(resp => { // se ejecuta cuando se tiene el resultado del servicio que corre de manera asincrona
        this.procesando=false;
        this.seEncontraroSN = (resp.length > 0);
        this.listSociosNegocio = Array.from(resp);
        this.mostrarResultadoBusqueda();
      });
  }
  mostrarResultadoBusqueda() {
    this.filterSearchSocioNegocio = this.txtSearch.valueChanges.pipe(
      startWith(''),
      map(value => this.filtrarSocioNegocio(value))
    );
  }
  filtrarSocioNegocio(me: string): SocioNegocioItem[] {
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
    const ruc=event.value;
    this.estadoCuentaService.consultarEstadoCuenta(ruc);
    this.documentosEnviadosService.consultarDocumentosEnviados(ruc);
    this.snService.getParticipanteByRuc(ruc).subscribe(
      participante => {
        this.seSeleccionoSocioNegocio=true;
        FormUtils.cleanForm(this.form);
        if (participante && participante.nombres) { //se encontro en la bdd de participantes
          this.form.patchValue(participante); 
        } else{ // se trae del erp
          console.log("No se encontro participante, traigo información del ERP");
          this.snService.getParticipanteByRucFromERP(event.value).subscribe(
            participanteFromERP => {
              console.log("SN del ERP:")
              console.log(participanteFromERP)
              if(participanteFromERP && participanteFromERP.nombres)
                this.form.patchValue(participanteFromERP); 
              else
               console.log("No hay info del cliente "+event.value+" en el ERP");
            }
          );
          
        }     
      }
    );
  }
  guardar() {
    // console.log(this.form.value);
    if (this.form.invalid) {
      this.utl.showMsg('Existen campos por validar!!', MessageType.warning);
      return;
    }
    console.log(this.form.value);
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
