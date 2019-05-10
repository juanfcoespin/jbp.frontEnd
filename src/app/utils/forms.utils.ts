import { FormControl, FormGroup } from '@angular/forms';
import { MessageType, AlertMsg } from '../msg/alert.msg';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent} from '../controls/alert/alert.component';
import { Injectable } from '@angular/core';

@Injectable()
export class FormUtils {
  private alertMsg: AlertMsg;
  constructor(private dialog: MatDialog) {}
  showMsg(msg, tipo: MessageType = MessageType.info) {
      this.alertMsg = new AlertMsg(msg, tipo);
      this.dialog.open(AlertComponent, {
          data: this.alertMsg,
          panelClass: 'myapp-no-padding-dialog'
      });
  }
  static MarkAsTouch (form: FormGroup) {
    for (const key in form.controls) {
      if (form.controls.hasOwnProperty(key)) {
        const control = <FormControl> form.controls[key];
        control.markAsTouched();
        const group = <FormGroup>form.controls[key];
        if (group) {
          this.MarkAsTouch(group);
        }
      }
    }
  }
  static cleanForm(me: FormGroup){
    for(let id in me.controls){
      const control = <FormControl>me.controls[id];
      control.setValue(null);
    }
  }
}

