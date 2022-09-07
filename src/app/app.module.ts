import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ServicesListComponent } from './services_/services-list/services-list.component';
import { NewServiceComponent } from './services_/new-service/new-service.component';
import { ServiceItemComponent } from './services_/service-item/service-item.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ServicesListComponent,
    NewServiceComponent,
    ServiceItemComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
