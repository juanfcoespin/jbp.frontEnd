import {  FormControl, Validators } from '@angular/forms';
export class NewUser {
    nombre: string;
    mail: string;
    idGenero: number;
    pwd: string;
    confirmPwd: string;
    empresas: Empresa[];
    constructor() {
        this.empresas = [];
    }
}
export class Empresa {
    Id: number;
    Nombre: string;
}
