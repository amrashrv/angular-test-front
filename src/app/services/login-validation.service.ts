import { Injectable } from '@angular/core';
import { ToastService } from 'angular-toastify';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TaskValidationService {
  constructor(private toastService: ToastService) {
  }

  taskValidation(formControl: FormControl) {
    if (formControl.errors) {
      if (formControl.errors['required']) {
        return this.toastService.error('required');
      }
      if (formControl.errors['maxlength']) {
        return this.toastService.error('max length should be less than 60 symbols');
      }
    } else {
      return formControl;
    }
  }
}
