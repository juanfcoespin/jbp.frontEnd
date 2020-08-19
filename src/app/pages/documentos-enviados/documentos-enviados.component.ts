import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DocumentosEnviadosServices } from 'src/app/services/documentosEnviadosServices';

@Component({
  selector: 'app-documentos-enviados',
  templateUrl: './documentos-enviados.component.html',
  styleUrls: ['./documentos-enviados.component.scss']
})
export class DocumentosEnviadosComponent implements OnInit {

  procesando: boolean;
  constructor(public docEnviadosservice: DocumentosEnviadosServices) {

  }

  ngOnInit() {
    
  }

}
