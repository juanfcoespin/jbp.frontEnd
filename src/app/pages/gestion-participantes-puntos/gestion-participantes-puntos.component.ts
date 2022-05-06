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
import { ActivatedRoute, GuardsCheckStart, Router } from '@angular/router';
import { MessageType } from 'src/app/msg/alert.msg';
import { UserService } from 'src/app/services/userService';
import { PromotickServices } from 'src/app/services/promotickServices';
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
  participante: any;
  // aqui se almacena el resultado de la consulta al servidor
  listSociosNegocio: SocioNegocioItem[] = [];
  vendedores: ItemMsg[] = [];

  // aqui se almacena el resultado de la consulta en la busquedad del cliente
  filterSearchSocioNegocio: Observable<SocioNegocioItem[]>;
  //filteredVendedor: Observable<string[]>;
  

  constructor(
    public global: GlobalVariables,
    private fb: FormBuilder,
    private utl: FormUtils,
    private snService: SocioNegocioService,
    private ptkService: PromotickServices,
    private documentosEnviadosService: DocumentosEnviadosServices,
    public userService: UserService,
    public route: ActivatedRoute
  ) {
      this.setTitulo();
      this.initForm();
      this.setGeneros();
      this.setCategorias();
      this.setTiposDocumento();
      
  }
  
  ngOnInit() {
    // se carga aqui porque puede tomar mas tiempo en la llamada asíncrona al servicio
    this.setVendedores();
    this.checkIfCalledFromAppVentas();
  }
  //gestión de la página si es que fue invocada desde el aplicativo de ventas
  //se manda por query string los valores de vendedor y cliente
  checkIfCalledFromAppVentas(){
    this.route.queryParams.subscribe(p=>{
      if(p && p.rucCliente && p.idVendedor){
        this.snService.getParticipanteByRuc(p.rucCliente).subscribe(participante=>{
          console.log(participante);
          this.setParticipante(participante, p.idVendedor);
        });
      }
    }); 
  }
  setTiposDocumento() {
    this.TiposDocumento = [
      {
        Id: 1,
        Cod: '',
        Nombre: 'Cédula'
      },
      {
        Id: 2,
        Cod: '',
        Nombre: 'Ruc'
      }
    ];
  }
  setCategorias() {
    this.categorias = [
      {
        Id: 1,
        Cod: '',
        Nombre: 'A'
      },
      {
        Id: 2,
        Cod: '',
        Nombre: 'B'
      }
    ];
  }
  setGeneros() {
    this.generos = [
      {
        Id: 1,
        Cod: '',
        Nombre: 'Masculino'
      },
      {
        Id: 2,
        Cod: '',
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
  
  setVendedores() {
    this.snService.getVendedores().subscribe(items => {
      this.vendedores = items;
      /*this.filteredVendedor = this.form.controls.vendedor.valueChanges.pipe(
        startWith(''),
        map(value => this.filtrarVendedor(value))
      );*/
    });
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
    this.snService.selectSocioNegocio(ruc);
    this.snService.getParticipanteByRuc(ruc).subscribe(participante => {
        this.setParticipante(participante);
      }
    );
  }
  setParticipante(participante, idVendedor=null){
    if (!participante || !participante.nombres) { //se encontro en la bdd de participantes
      this.utl.showMsg("El ruc no esta asociado a ningún participante del plan puntos!!",MessageType.warning)
      FormUtils.cleanForm(this.form);
      this.seSeleccionoSocioNegocio=false;
      return;
    }
    FormUtils.cleanForm(this.form);
    if(this.usuarioAutorizado(participante, idVendedor)){
      this.participante=participante;
      this.seSeleccionoSocioNegocio=true;
      this.form.patchValue(participante); 
      this.documentosEnviadosService.consultarDocumentosEnviados(participante.RucPrincipal);
    }
  }
  usuarioAutorizado(participante, idVendedor=null){
    console.log(this.userService.currentUserValue);
    if(this.loggedUserHasPerfil('Administrador') || this.loggedUserHasPerfil('Administrador Ventas') || this.loggedUserPerteneceAlGrupo('Ventas'))
      return true;
    if(this.loggedUserHasPerfil('Vendedor')){
      //Solo si el vendedor está a cargo del participante lo puede ver
      const correoUsuario=this.userService.currentUserValue.correo.toLocaleLowerCase();
      const correoVendedor=participante.correoVendedor.toLocaleLowerCase();
      console.log(correoUsuario);
      console.log(correoVendedor);
      if (correoUsuario === correoVendedor)
        return true;
    }
    if(idVendedor && participante.idVendedor==idVendedor){
      return true;
    }
    this.utl.showMsg("Ud no está autorizado para ver este participante!!", MessageType.warning);
    return false;
  }
  loggedUserHasPerfil(perfil){
    console.log(this.userService.currentUserValue);
    if(!this.userService.currentUserValue)
      return false;
    let index=this.userService.currentUserValue.Perfiles.findIndex (p=>p===perfil);
    return (index>-1);
  }
  loggedUserPerteneceAlGrupo(grupo){
    console.log(this.userService.currentUserValue);
    if(!this.userService.currentUserValue)
      return false;
    let index=this.userService.currentUserValue.GruposDirectorioActivo.findIndex (p=>p===grupo);
    return (index>-1);
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
