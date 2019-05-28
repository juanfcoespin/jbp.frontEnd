import { Component, OnInit } from '@angular/core';
import { UrlServices } from 'src/app/global';

@Component({
  selector: 'app-business-services',
  templateUrl: './business-services.component.html',
  styleUrls: ['./business-services.component.css']
})
export class BusinessServicesComponent implements OnInit {
  promotickServiceHubUrl: string;
  promotickServiceUrl: string;
  constructor() {
  }

  ngOnInit() {
    this.promotickServiceUrl = UrlServices.promotickServiceUrl;
    this.promotickServiceHubUrl = UrlServices.promotickServiceHubUrl;
  }
}
