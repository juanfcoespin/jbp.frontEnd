import { Component, OnInit, Input } from '@angular/core';
import { NotificationService } from 'src/app/services/notificationService';
import { LogMsg, eTypeLog } from 'src/app/msg/common.msg';
import { HttpClient } from '@angular/common/http';
import { FormUtils } from 'src/app/utils/forms.utils';
import { MessageType } from 'src/app/msg/alert.msg';
import { Observable, observable } from 'rxjs';
import { ArrayUtils} from 'src/app/utils/arrayUtils';
import { map } from 'rxjs/operators';

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
  logs: LogMsg[];
  logsObs: Observable<LogMsg[]>;
  constructor(
    private notificationService: NotificationService,
    private http: HttpClient,
    private utls: FormUtils
  ) {
    this.serviceName = null;
    this.serviceUrl = null;
    this.serviceHubUrl = null;
    this.logs = [];
    this.logsObs = new Observable<LogMsg[]>();
   }
   ngOnInit() {
    this.getTodayLogs();
    this.initServiceHub();
  }
   initServiceHub() {
    if (this.serviceHubUrl !== null) {
      this.notificationService.initHub(this.serviceHubUrl);
      this.notificationService.logObservable.subscribe(item => {
        const log = this.SetLogAditionalInfo(item);
        this.logs.push(log);
        this.notifyChange();
      });
    }
   }
   SetLogAditionalInfo(me: LogMsg): LogMsg {
    const ms = new LogMsg();
    ms.date = me.date;
    ms.msg = me.msg;
    ms.type = me.type;
    switch (ms.type) {
      case eTypeLog.Info:
        ms.icon = 'info';
        ms.iconClass = 'infoIcon';
        break;
      case eTypeLog.Advertencia:
        ms.icon = 'warning';
        ms.iconClass = 'warningIcon';
        break;
      case eTypeLog.Error:
        ms.icon = 'error';
        ms.iconClass = 'errorIcon';
        break;
    }
    return ms;
  }
  getTodayLogs() {
    if (this.serviceUrl !== null) {
      const url = this.serviceUrl + '/logByDate/2019-05-31';
      this.http.get<LogMsg[]>(url).subscribe(resp => {
        this.logs = Array.from(this.SetLogsAditionalInfo(resp));
        this.notifyChange();
      });
    }
  }
  notifyChange() {
    this.logsObs = new Observable(obs => {
      obs.next(ArrayUtils.OrderByLastFirst(this.logs));
    });
  }
  SetLogsAditionalInfo(logs: any[]) {
    const ms = [];
    logs.forEach(log =>
      ms.push(this.SetLogAditionalInfo(log))
    );
    return ms;
  }
  check() {
    if (this.serviceUrl !== null) {
      const url = this.serviceUrl + '/status';
      this.http.get<string>(url).subscribe(resp => this.utls.showMsg(resp));
    } else {
      this.utls.showMsg('No se ha espesificado la url del servicio', MessageType.warning);
    }
  }
}
