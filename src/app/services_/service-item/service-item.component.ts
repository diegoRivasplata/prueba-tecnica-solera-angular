import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Service } from 'src/app/model/service.model';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-service-item',
  templateUrl: './service-item.component.html',
  styleUrls: ['./service-item.component.css']
})
export class ServiceItemComponent implements OnInit {
  @Input() service: Service | null = null;
  @Output() deleteServiceEvent = new EventEmitter<Service>();

  constructor(private serviceService: ServiceService) { }

  ngOnInit(): void {
  }

  onUpdate(service: Service){
    this.serviceService.setServiceToUpdate(service);
  }

  onDelete(service: Service){
    this.deleteServiceEvent.emit(service);
  }
}
