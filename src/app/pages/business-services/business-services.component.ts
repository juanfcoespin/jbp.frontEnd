import { Component, OnInit } from '@angular/core';
import { NotificationService  } from 'src/app/services/notificationService';

@Component({
  selector: 'app-business-services',
  templateUrl: './business-services.component.html',
  styleUrls: ['./business-services.component.css']
})
export class BusinessServicesComponent implements OnInit {

  constructor(
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.notificationService.promotickLogObservable.subscribe(log => {
      console.log(log);
    });
  }
}
