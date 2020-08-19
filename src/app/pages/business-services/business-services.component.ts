import { Component, OnInit } from '@angular/core';
import { UrlServices } from 'src/app/global';

@Component({
  selector: 'app-business-services',
  templateUrl: './business-services.component.html',
  styleUrls: ['./business-services.component.scss']
})
export class BusinessServicesComponent implements OnInit {
  promotickServiceHubUrl: string;
  promotickBusinessServiceOrdersUrl: string;
  constructor() {
  }

  ngOnInit() {
    this.promotickBusinessServiceOrdersUrl = UrlServices.promotickBusinessServiceOrdersUrl;
    this.promotickServiceHubUrl = UrlServices.promotickServiceHubUrl;
  }
}
