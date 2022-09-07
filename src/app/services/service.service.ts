import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Service } from '../model/service.model';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private services: Service[] = [
    new Service(
      (parseFloat(Math.random().toFixed(3)) * 1000).toString(),
      'Electricidad',
      'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      'Hogar'
    ),
    new Service(
      (parseFloat(Math.random().toFixed(3)) * 1000).toString(),
      'Auxilio Mecánico',
      'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      'Autos'
    ),
    new Service(
      (parseFloat(Math.random().toFixed(3)) * 1000).toString(),
      'Chofer reemplazo',
      'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      'Autos'
    ),
    new Service(
      (parseFloat(Math.random().toFixed(3)) * 1000).toString(),
      'Médico a domicilio',
      'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      'Salud'
    ),
    new Service(
      (parseFloat(Math.random().toFixed(3)) * 1000).toString(),
      'Ambulancia',
      'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      'Salud'
    ),
    new Service(
      (parseFloat(Math.random().toFixed(3)) * 1000).toString(),
      'Gasfitero',
      'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      'Hogar'
    ),
  ];

  servicesChanged = new Subject<Service[]>();
  serviceUpdates = new Subject<Service | undefined>();

  private activeFilter = 'Todos';

  constructor() {}

  fetchData() {
    this.servicesChanged.next(this.services);
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
