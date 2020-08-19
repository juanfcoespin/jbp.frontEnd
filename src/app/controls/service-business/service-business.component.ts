import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { BusinessServiceOrders } from 'src/app/services/businessServiceOrders';
import { LogMsg, eTypeLog } from 'src/app/msg/common.msg';
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
  styleUrls: ['./service-business.component.scss']
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
    this.businessServiceOrders.setServiceHubUrl(this.serviceHubUrl)  ;
    this.businessServiceOrders.setServiceOrderUrl(this.serviceOrdersUrl);
    // las subscripciones se inicializan una vez que el  hub este conectado
    this.businessServiceOrders.hubConnectedObs.subscribe(() => {
      this.subscribeIsRunning();
      this.subscribeLogs();
      this.subscribeTodayLogs();
    });
 }
  subscribeIsRunning() {
    this.businessServiceOrders.isRunningObs.subscribe(isRuning => {
      console.log('El servicio: "' + this.serviceName + '" esta corriendo?: ' + isRuning);
      this.isRunning = isRuning;
    } );
  }
  subscribeTodayLogs() {
    this.businessServiceOrders.todayLogObs.subscribe(logs => {
        logs.forEach(log => this.showLog(log));
    });
  }
  subscribeLogs() {
    this.businessServiceOrders.logObs.subscribe(item => {
      this.showLog(item);
    });
  }
  showLog(me: LogMsg) {
    const log = this.SetLogAditionalInfo(me);
    this.logs.push(log);
    this.notifyChange();
    if (log.msg === 'is runing: true') {
      this.isRunning = true;
    }
    if (log.msg === 'is runing: false') {
      this.isRunning = false;
    }
    // if (log.msg.startsWith('Status:')) {
    //   this.utls.showMsg(log.msg.replace('Status:', ''));
    // }
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
    console.log('fuente de datos:');
    console.log(this.logsObs.source);
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
        this.businessServiceOrders.start().subscribe();
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
