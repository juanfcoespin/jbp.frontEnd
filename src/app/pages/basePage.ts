import { GlobalVariables } from '../global';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export class BasePage {
    global: GlobalVariables;
    form: FormGroup;
    // fb: FormBuilder;
    constructor(private titulo: string) {
        this.global = new GlobalVariables();
        this.global.setComponentTitle(titulo);
    }
}
