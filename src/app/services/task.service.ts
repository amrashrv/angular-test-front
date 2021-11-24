import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

export enum EditTaskType {
  check,
  editText
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private apiService: ApiService) {
  }

}
