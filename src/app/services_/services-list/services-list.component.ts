import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Service } from 'src/app/model/service.model';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.css'],
})
export class ServicesListComponent implements OnInit {
  servicesList: Service[] = [];
  private servicesListSubs: Subscription = new Subscription();
  private serviceToUpdateSubs: Subscription = new Subscription();
  serviceToDelete: Service | undefined;

  constructor(private serviceService: ServiceService) {}

  ngOnInit(): void {
    this.servicesListSubs = this.serviceService.servicesChanged.subscribe(
      (services) => {
        this.servicesList = services;
      }
    );
    this.serviceToUpdateSubs = this.serviceService.serviceUpdates.subscribe(
      (service) => this.setUpdating(service)
    );
    this.serviceService.fetchData();
  }

  setUpdating(service: Service | undefined) {
    if (service !== undefined) {
      const elements = Array.from(document.getElementsByClassName('updating'));
      elements.forEach((item) => {
        item.classList.remove('updating');
      });
      document.getElementById(service.id)?.classList.add('updating');
    } else {
      const elements = Array.from(document.getElementsByClassName('updating'));
      elements.forEach((item) => {
        item.classList.remove('updating');
      });
    }
  }

  onDeleteServiceEvent(service: Service) {
    this.serviceToDelete = service;
  }

  onDelete() {
    if (this.serviceToDelete !== undefined) {
      this.serviceService.delete(this.serviceToDelete.id);
      setTimeout(() => {
        Array.from(document.getElementsByClassName('btn-link')).forEach(
          (button) => {
            const element = button as HTMLButtonElement;
            element.blur();
          }
        );
      }, 350);
      this.serviceService.setServiceToUpdate(undefined);
      this.onCancel();
    }
  }

  onCancel() {
    this.serviceToDelete = undefined;
  }

  ngOnDestroy(): void {
    this.servicesListSubs.unsubscribe();
    this.serviceToUpdateSubs.unsubscribe();
  }
}
