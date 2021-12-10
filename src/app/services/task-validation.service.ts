import { FormControl } from '@angular/forms';
import { ToastService } from 'angular-toastify';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskValidationService {
  constructor(private _toastService: ToastService) {
  }

  taskValidation(formControl: FormControl) {
    if (formControl.errors) {
      if (formControl.errors['required']) {
        return this._toastService.error('required');
      }
      if (formControl.errors['maxlength']) {
        return this._toastService.error('max length should be less than 60 symbols');
      }
    } else {
      return formControl;
    }
  }
}
