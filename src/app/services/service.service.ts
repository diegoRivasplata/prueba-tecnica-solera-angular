import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Service } from '../model/service.model';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private services: Service[] = [];

  servicesChanged = new Subject<Service[]>();
  serviceUpdates = new Subject<Service | undefined>();

  private activeFilter = 'Todos';

  constructor(private httpClient: HttpClient) {}

  fetchData() {
    this.httpClient.get("assets/data.json").subscribe(data =>{
      Object.assign(this.services, data);
      this.servicesChanged.next(this.services);
    });
  }

  save(service: Service) {
    const serviceExists = this.services.find((item) => item.id === service.id);
    if (serviceExists) {
      this.update(service);
    } else {
      this.services = [...this.services, service];
    }
    this.filter(this.activeFilter);
  }

  delete(id: string) {
    this.services = this.services.filter((item) => item.id !== id);
    this.filter(this.activeFilter);
  }

  setServiceToUpdate(service: Service | undefined) {
    this.serviceUpdates.next(service);
  }

  update(service: Service) {
    let serviceToUpdateIndex = this.services.findIndex(
      (item) => item.id === service.id
    );
    let serviceToUpdate = this.services[serviceToUpdateIndex];
    if (serviceToUpdate) {
      serviceToUpdate = {
        ...serviceToUpdate!,
        title: service.title,
        description: service.description,
        category: service.category,
      };
      this.services[serviceToUpdateIndex] = serviceToUpdate;
    }
    this.filter(this.activeFilter);
  }

  filter(filter: string) {
    this.activeFilter = filter;
    if (this.activeFilter === 'Todos') {
      this.servicesChanged.next(this.services);
    } else {
      this.servicesChanged.next(
        this.services.filter((item) => item.category === this.activeFilter)
      );
    }
  }
}
