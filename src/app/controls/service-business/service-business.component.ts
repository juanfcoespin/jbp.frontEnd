import { Component, OnInit, Input } from '@angular/core';
import { BusinessServiceOrders } from 'src/app/services/businessServiceOrders';
import { LogMsg, eTypeLog } from 'src/app/msg/common.msg';
import { HttpClient } from '@angular/common/http';
import { FormUtils } from 'src/app/utils/forms.utils';
import { MessageType } from 'src/app/msg/alert.msg';
import { Observable, observable } from 'rxjs';
import { ArrayUtils} from 'src/app/utils/arrayUtils';
import { StringUtils} from 'src/app/utils/stringUtils';
import { map } from 'rxjs/operators';
import { utils } from 'protractor';

@Component({
  selector: 'app-service-business',
  templateUrl: './service-business.component.html',
  styleUrls: ['./service-business.component.css']
})
export class ServiceBusinessComponent implements OnInit {

  @Input()
  serviceName: string;

  @Input()
  serviceOrdersUrl: string;

  @Input()
  serviceHubUrl: string;
  isRunning: boolean;
  status: string;
  logs: LogMsg[];
  logsObs: Observable<LogMsg[]>;
  displayedColumns: string[] = ['icon', 'date', 'msg'];
  constructor(
    private businessServiceOrders: BusinessServiceOrders,
    private http: HttpClient,
    private utls: FormUtils
  ) {
    this.serviceName = null;
    this.serviceOrdersUrl = null;
    this.serviceHubUrl = null;
    this.logs = [];
    this.logsObs = new Observable<LogMsg[]>();
   }
  ngOnInit() {
    // this.getTodayLogs();
    this.initBusinessServiceOrders();
  }
  initBusinessServiceOrders() {
    this.businessServiceOrders.serviceHubUrl = this.serviceHubUrl;
    this.businessServiceOrders.serviceOrdersUrl = this.serviceOrdersUrl;
    if (this.serviceHubUrl !== null ) {
      this.businessServiceOrders.initHub();
      this.subscribeLogs();
      this.subscribeIsRunningResponse();
    } else {
      this.utls.showMsg('No se ha espesificado la url del hub del servicio');
    }
    if (this.serviceHubUrl !== null && this.serviceOrdersUrl) {
      this.subscribeCheckIsRunning();
    }
  }
  subscribeIsRunningResponse() {
    this.businessServiceOrders.isRunningResponse.subscribe(isRuning => {
      console.log('the service ' + this.serviceName + 'esta corriendo?: ' + isRuning);
      this.isRunning = isRuning;
    } );
  }
  subscribeCheckIsRunning() {
    // pide al servidor que chequee si el servicio esta corriendo
    this.businessServiceOrders.checkIsRunning().subscribe();
  }
  subscribeLogs() {
    this.businessServiceOrders.logObservable.subscribe(item => {
      const log = this.SetLogAditionalInfo(item);
      this.logs.push(log);
      this.notifyChange();
      if (log.msg === 'is runing: true') {
        this.isRunning = true;
      }
      if (log.msg === 'is runing: false') {
        this.isRunning = false;
      }
      if (log.msg.startsWith('Status:')) {
        this.utls.showMsg(log.msg.replace('Status:', ''));
      }
    });
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
  // notifyRunning(running: boolean) {
  //   this.isRunning = new Observable(obs => obs.next(running));
  // }
  // getTodayLogs() {
  //   this.businessServiceOrders.getTodayLogs().subscribe(logs => {
  //     this.logs = Array.from(this.SetLogsAditionalInfo(logs));
  //     this.notifyChange();
  //   });
  // }
  notifyChange() {
    this.logsObs = new Observable(obs => {
      const logsOrdered = ArrayUtils.OrderByLastFirst(this.logs);
      if (logsOrdered != null && logsOrdered.length > 0) {
        this.status = logsOrdered[0].msg;
        obs.next(logsOrdered);
      }
    });
  }
  SetLogsAditionalInfo(logs: any[]) {
    const ms = [];
    logs.forEach(log =>
      ms.push(this.SetLogAditionalInfo(log))
    );
    return ms;
  }
  checkStatus() {
    if (this.serviceOrdersUrl !== null) {
      this.businessServiceOrders.status().subscribe();
    } else {
      this.utls.showMsg('No se ha espesificado la url del servicio', MessageType.warning);
    }
  }
  start() {
    if (this.serviceOrdersUrl !== null) {
      // if (!this.isRunning) {
        this.businessServiceOrders.start().subscribe();
      // } else {
      //   this.utls.showMsg('El servicio ya está corriendo', MessageType.warning);
      // }
    } else {
      this.utls.showMsg('No se ha espesificado la url del servicio', MessageType.warning);
    }
  }
  AddMesgLog(resp: string) {
    const log = new LogMsg();
    log.type = eTypeLog.Info;
    log.msg = resp;
    this.logs.push(this.SetLogAditionalInfo(log));
  }
  stop() {
    if (this.serviceOrdersUrl !== null) {
      // if (this.isRunning) {
        this.businessServiceOrders.stop().subscribe();
      // } else {
      //   this.utls.showMsg('El servicio ya está parado', MessageType.warning);
      // }
    } else {
      this.utls.showMsg('No se ha espesificado la url del servicio', MessageType.warning);
    }
  }
}
