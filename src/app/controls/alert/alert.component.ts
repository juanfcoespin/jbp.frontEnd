
import { Component, OnInit, Inject } from '@angular/core';
import { AlertMsg } from '../../msg/alert.msg';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StringUtils} from '../../utils/stringUtils';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: AlertMsg) {}

  ngOnInit() {
    // this.data.message = StringUtils.replace(this.data.message, '\r\n', '<br>');
    // this.data.message = StringUtils.replace(this.data.message, '\r', '<br>');
    // this.data.message = StringUtils.replace(this.data.message, '\n', '<br>');
    this.data.message = this.data.message.split("\r\n").join("<br/>");
    this.data.message = this.data.message.split("\n").join("<br/>");
    this.data.message = this.data.message.split("\r").join("<br/>");
  }
  ok() {

  }
}
