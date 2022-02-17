import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-clientes-encontrados-dialog',
  templateUrl: './clientes-encontrados-dialog.component.html',
  styleUrls: ['./clientes-encontrados-dialog.component.scss']
})
export class ClientesEncontradosDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ClientesEncontradosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
      
  }

}
export interface DialogData {
  rucSeleccionado: string; //animal
  clientes: any[]; //name
}
