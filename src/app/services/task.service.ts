import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { setErrorState } from '../state/app/app.actions';
import { Store } from '@ngrx/store';
import { ToastService } from 'angular-toastify';

export enum EditTaskType {
  check,
  editText
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  errorHandler(msg: string) {
    console.log(msg);
    this._toastService.error(msg);
    return setErrorState({ hasError: true });
  }
  constructor(private apiService: ApiService, private store: Store, private _toastService: ToastService) {
  }

}
