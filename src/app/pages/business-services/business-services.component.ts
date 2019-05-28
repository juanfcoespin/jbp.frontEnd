import { Component, OnInit } from '@angular/core';
import { NotificationService  } from 'src/app/services/notificationService';
import { LogMsg, eTypeLog } from 'src/app/msg/common.msg';

@Component({
  selector: 'app-business-services',
  templateUrl: './business-services.component.html',
  styleUrls: ['./business-services.component.css']
})
export class BusinessServicesComponent implements OnInit {
  serviceRuning: boolean;
  constructor(
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.serviceRuning = true;
    this.notificationService.promotickLogObservable.subscribe(log => {
      console.log(log);
      if (log.type === eTypeLog.Error) {
        console.log('Error');
      }
    });
  }
}
