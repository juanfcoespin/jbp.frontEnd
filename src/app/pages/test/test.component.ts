import { Component, OnInit } from '@angular/core';
import { cheque, factura} from '../../msg/tmpMsg';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})

 
export class TestComponent implements OnInit {
  
  facturas: factura[]=[];
  facturasPagadas: factura[]=[];
  cheques: cheque[] =[];
     
  
  constructor() { }

  ngOnInit(): void {
    this.setCheques();
    this.setFacturas();
    this.setFechaPagoFactura();
    console.log('------resultado------');
    console.log(this.facturasPagadas);
  }
  setCheques(){
    this.cheques.push(new cheque("2020-05-01",500));
    this.cheques.push(new cheque("2020-05-16",500));
    this.cheques.push(new cheque("2020-05-23",500));

      // this.cheques.push(new cheque("2020-02-24",207.53));
      // this.cheques.push(new cheque("2020-02-29",207.53));
  }
  setFacturas(){
   this.facturas.push(new factura(1752.08));

      // this.facturas.push(new factura(133.59));
      // this.facturas.push(new factura(281.46));
      // this.facturas.push(new factura(0.01));
  }
  setFechaPagoFactura(){
    this.facturas.forEach(f=>{
      if(f.saldo>0){
        console.log(f);
        //pagar factura
        this.pagarFactura(f);
        console.log(f);
      }
    });
  }
  pagarFactura(f: factura){
    
    this.cheques.forEach(ch=>{
      if(f.saldo>0 && ch.montoDisponible>0){ //se paga o se hace un abono
        let facturaPagada=new factura(f.pago);
        //console.log(ch);
        facturaPagada.fechaPago=ch.fechaVencimiento;
        if(ch.montoDisponible>=f.saldo){ //se paga la totalidad del saldo
          ch.montoAsignado+=f.saldo;
          facturaPagada.montoAsignado=f.saldo;
          f.montoAsignado+=f.saldo;
        }
        else{ //se abona al saldo
          ch.montoAsignado+=ch.montoDisponible;
          facturaPagada.montoAsignado=ch.montoDisponible;
          f.montoAsignado+=ch.montoDisponible
        }
        this.facturasPagadas.push(facturaPagada);
        ch.calcularDisponible();
        f.calcSaldo();
        //console.log(ch);
      }
    });
  }
}
