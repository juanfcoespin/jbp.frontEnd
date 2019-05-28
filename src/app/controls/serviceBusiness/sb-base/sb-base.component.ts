import { Component, OnInit, Input } from '@angular/core';
import { NotificationService } from 'src/app/services/notificationService';
import { LogMsg, eTypeLog } from 'src/app/msg/common.msg';
import { HttpClient } from '@angular/common/http';
import { FormUtils } from 'src/app/utils/forms.utils';
import { MessageType } from 'src/app/msg/alert.msg';

@Component({
  selector: 'app-sb-base',
  templateUrl: './sb-base.component.html',
  styleUrls: ['./sb-base.component.css']
})
export class SbBaseComponent implements OnInit {

  @Input()
  serviceName: string;

  @Input()
  serviceUrl: string;

  @Input()
  serviceHubUrl: string;

  status: string;
  constructor(
    private notificationService: NotificationService,
    private http: HttpClient,
    private utls: FormUtils
  ) {
    this.status = '';
    this.serviceName = null;
    this.serviceUrl = null;
    this.serviceHubUrl = null;
   }
  ngOnInit() {
    if (this.serviceHubUrl !== null) {
      this.notificationService.initHub(this.serviceHubUrl);
      this.notificationService.logObservable.subscribe(log => {
        this.status += log.msg;
      });
    }

  }
  check() {
    if (this.serviceUrl !== null) {
      const url = this.serviceUrl + '/status';
      this.http.get<string>(url).subscribe(resp => status += resp);
    } else {
      this.utls.showMsg('No se ha espesificado la url del servicio', MessageType.warning);
    }
  }
}
