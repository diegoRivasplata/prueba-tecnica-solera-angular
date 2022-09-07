import { Component, OnInit } from '@angular/core';
import { Categories } from '../model/category.model';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  filtros: string[] = [
    'Todos',
    ...Object.keys(Categories).filter((item) => {
      return isNaN(Number(item));
    }),
  ];

  activeFilter: string = 'Todos';

  constructor(private serviceService: ServiceService) {}

  ngOnInit(): void {}

  onClick(filter: string) {
    this.setActive(filter);
    this.serviceService.filter(filter);
    this.serviceService.setServiceToUpdate(undefined);
  }

  setActive(option: string) {
    const elements = Array.from(document.getElementsByClassName('active'));
    elements.forEach((item) => {
      item.classList.remove('active');
    });
    document.getElementById(option)?.classList.add('active');
  }
}
