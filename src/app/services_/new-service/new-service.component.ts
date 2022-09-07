import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Categories } from 'src/app/model/category.model';
import { Service } from 'src/app/model/service.model';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-new-service',
  templateUrl: './new-service.component.html',
  styleUrls: ['./new-service.component.css'],
})
export class NewServiceComponent implements OnInit {
  serviceForm = this.fb.group({
    id: [''],
    title: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    description: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(60)],
    ],
    category: ['', [Validators.required]],
  });

  categories = Object.keys(Categories).filter((item) => {
    return isNaN(Number(item));
  });

  updateServiceSubs: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private serviceService: ServiceService
  ) {}

  ngOnInit(): void {
    this.updateServiceSubs = this.serviceService.serviceUpdates.subscribe(
      (service) => {
        if (service !== undefined) {
          this.serviceForm.controls.id.setValue(service.id);
          this.serviceForm.controls.title.setValue(service.title);
          this.serviceForm.controls.description.setValue(service.description);
          this.serviceForm.controls.category.setValue(service.category);
        }
        else {
          this.cleanForm();
        }
      }
    );
  }

  onSaveService(e: Event) {
    e.preventDefault();
    if (this.serviceForm.valid) {
      this.serviceService.save(
        new Service(
          this.serviceForm.controls['id'].value
            ? this.serviceForm.controls['id'].value
            : (parseFloat(Math.random().toFixed(3)) * 1000).toString(),
          this.serviceForm.controls['title'].value!,
          this.serviceForm.controls['description'].value!,
          this.serviceForm.controls['category'].value!
        )
      );
      this.cleanForm();
      this.serviceService.setServiceToUpdate(undefined);
    } else {
      this.serviceForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.cleanForm();
    this.serviceService.setServiceToUpdate(undefined);
  }

  cleanForm() {
    this.serviceForm.patchValue({
      id: '',
      title: '',
      description: '',
      category: '',
    });
    this.serviceForm.markAsUntouched();
  }
}
