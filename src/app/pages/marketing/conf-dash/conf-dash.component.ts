import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { MessageType } from 'src/app/msg/alert.msg';
import { MarketingServices } from 'src/app/services/marketingServices';
import { UserService } from 'src/app/services/userService';
import { FormUtils } from 'src/app/utils/forms.utils';
import { BasePage } from '../../basePage';

@Component({
  selector: 'app-conf-dash',
  templateUrl: './conf-dash.component.html',
  styleUrls: ['./conf-dash.component.scss']
})
export class ConfDashComponent extends BasePage  implements OnInit {
  procesando:boolean=false;
  dash:any={}
  dashBoards:any[]=[];
  modulosEmpty:any[]=[];
  editing:boolean=false;
  constructor(private utl: FormUtils, public mkService: MarketingServices, public usrService: UserService) { 
    super('Configuracion Dashboards');
    this.dash.modulos=[];
    this.cargarModulos();
    this.cargarDashboards();
  }
    
  ngOnInit() {
  }
  setModulosTxt(){
    this.dash.modulosStr='';
    var i=0;
    this.dash.modulos.forEach(modulo=>{
      if(modulo.Checked){
        if(i>0)
          this.dash.modulosStr += ', ';  
        this.dash.modulosStr += modulo.Name;
        i++;
      }
        
    });
  }
  cargarModulos(){
    this.usrService.getModulos().subscribe(me=>{
      me.forEach(moduleName=>{
        this.modulosEmpty.push({
          Name: moduleName,
          Checked: false
        });
        this.dash.modulos=this.modulosEmpty;
      });
      
    });
  }
  cargarDashboards(){
    this.mkService.getDasboards().subscribe(me=>{
        if(me.error)
          console.log(me.error);
        else{
          this.dashBoards=me.data;
          console.log(this.dashBoards);
        }
      }, error=>{
        console.log(error);
      }
    );
  }
  borrar(dash){
    console.log(dash);
    if(!confirm("Esta seguro de eliminar este dashboard?"))
      return;
    const index = this.dashBoards.findIndex(p=>p.id==dash.id);
    this.mkService.deleteDasboard(dash.id).subscribe(me=>{
      if(me=='ok'){
        this.dashBoards.splice(index,1);
      }else
        this.utl.showMsg(me, MessageType.error);
    }, error=>this.utl.showMsg(error, MessageType.error));
    this.clearDash();
  }
  editar(dash){
    this.editing=true;
    this.dash=dash;
  }
  registrar(){
    console.log(this.dash);
    this.setModulosTxt();
    if(!this.valido())
      return;
    this.procesando=true;
    console.log(this.dash);
    var insertar=(!this.dash.id);
    this.mkService.registrarDashBoard(this.dash).subscribe(me=>{
      console.log(me);
      if(me.error)
        this.utl.showMsg(me.error,MessageType.error);
      else{
        if(insertar)//solo para insertar
          this.dashBoards.push(me);
        console.log(this.dashBoards);
        
      }
      this.clearDash();
      this.procesando=false;
    },error=>{
      this.clearDash();
      this.utl.showMsg(error,MessageType.error);
      this.procesando=false;
    });
  }
  clearDash(){
    this.editing=false;
    this.dash={};
    this.modulosEmpty.forEach(m=>m.Checked=false);
    this.dash.modulos=this.modulosEmpty;
    console.log(this.dash);
  }
  valido(){
    if(!this.dash.modulosStr){
      this.utl.showMsg('Debe registrar al menos un Modulo!!',MessageType.warning);
      return false;
    }
    if(!this.dash.nombre){
      this.utl.showMsg('Nombre requerido!!',MessageType.warning);
      return false;
    }
    if(!this.dash.url){
      this.utl.showMsg('Url requerido!!',MessageType.warning);
      return false;
    }
    return true;
  }

}
