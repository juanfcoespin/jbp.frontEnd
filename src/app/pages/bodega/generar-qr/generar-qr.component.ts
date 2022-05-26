import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { timeStamp } from 'console';
import { MessageType } from 'src/app/msg/alert.msg';
import { BodegaServices } from 'src/app/services/bodegaServises';
import { FormUtils } from 'src/app/utils/forms.utils';

@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.component.html',
  styleUrls: ['./generar-qr.component.scss']
})
export class GenerarQRComponent implements OnInit {
  form: FormGroup;
  niveles: any[];
  perchas: any[];
  pallets: any[];
  ubicaciones: string[]=[];
  constructor(private fb: FormBuilder, private bodegaService: BodegaServices, private utl: FormUtils) { 
    this.bodegaService.getSubniveles().subscribe(subniveles=>{
      this.niveles=this.bodegaService.getNivelesByTocken(subniveles,'NIVEL');
      this.perchas=this.bodegaService.getNivelesByTocken(subniveles,'PERCHA');
      this.pallets=this.bodegaService.getNivelesByTocken(subniveles,'SECCION');
    });
  }

  ngOnInit() {
    this.form = this.fb.group({
      nivel: [null, Validators .required],
      percha: [null, Validators.required],
      palletDesde: [null, Validators.required],
      palletHasta: [null, Validators.required],
    });
  }
  generarUbicaciones(){
    this.ubicaciones=[];
    if(this.form.invalid){
      this.utl.showMsg('Debe escoger los parametros para la generacion de las ubicaciones!!',MessageType.warning);
      return;
    }
    this.pallets.forEach(p=>{
      if(p.id>=this.form.value.palletDesde.id && p.id<=this.form.value.palletHasta.id){
        const ubicacion = this.form.value.percha.codigo+'-'+this.form.value.nivel.codigo+'-'+p.codigo;
        this.ubicaciones.push(ubicacion);
      }
    });
    console.log(this.ubicaciones);
  }
}
