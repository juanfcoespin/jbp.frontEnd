import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { timeStamp } from 'console';
import { MessageType } from 'src/app/msg/alert.msg';
import { BodegaServices } from 'src/app/services/bodegaServises';
import { ConfigUtils } from 'src/app/utils/configUtils';
import { FormUtils } from 'src/app/utils/forms.utils';

@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.component.html',
  styleUrls: ['./generar-qr.component.scss']
})
export class GenerarQRComponent implements OnInit {
  form: FormGroup;
  qrWidth: number=255;
  niveles: any[];
  perchas: any[];
  pallets: any[];
  public tipoUbicacion: string='masiva';
  ubicacionManual: string;
  ubicaciones: any[]=[];
  constructor(private fb: FormBuilder, private bodegaService: BodegaServices, private utl: FormUtils) { 
    this.bodegaService.getSubniveles().subscribe(subniveles=>{
      this.niveles=this.bodegaService.getNivelesByTocken(subniveles,'NIVEL');
      this.perchas=this.bodegaService.getNivelesByTocken(subniveles,'PERCHA');
    });
    this.pallets=this.getSecciones();
    console.log(this.pallets);
  }

  ngOnInit() {
    this.form = this.fb.group({
      nivel: [null, Validators .required],
      percha: [null, Validators.required],
      palletDesde: [null, Validators.required],
      palletHasta: [null, Validators.required],
    });
  }
  getSecciones(){
    let ms=[];
    for(let i=1;i<40; i++)
      ms.push({
        id: i,
        codigo: 'S'+i
      });
    return ms;
  }
  encerarQRs(){
    this.ubicaciones=[];
  }
  generarUbicaciones(){
    this.ubicaciones=[];
    if(this.tipoUbicacion=='manual'){
      if(!this.ubicacionManual){
        this.utl.showMsg("Debe ingresar una ubicación!!", MessageType.warning);
      }else{
        //this.ubicaciones.push(this.ubicacionManual);
        this.ubicaciones.push({
          ubicacion: this.ubicacionManual,
          urlConsulta: ConfigUtils.urlConsultaUbicacion +this.ubicacionManual
        });
        console.log(this.ubicaciones);
      }
      return;
    }
    if(this.form.invalid){
      this.utl.showMsg('Debe escoger los parametros para la generacion de las ubicaciones!!',MessageType.warning);
      return;
    }
    this.pallets.forEach(p=>{
      if(p.id>=this.form.value.palletDesde.id && p.id<=this.form.value.palletHasta.id){
        const ubicacion = this.form.value.percha.codigo+'-'+this.form.value.nivel.codigo+'-'+p.codigo;
        //this.ubicaciones.push(ubicacion);
        this.ubicaciones.push({
          ubicacion: ubicacion,
          urlConsulta: ConfigUtils.urlConsultaUbicacion +ubicacion
        });
      }
    });
    console.log(this.ubicaciones);
  }
}
