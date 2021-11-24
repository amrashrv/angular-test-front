import { Injectable } from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { ITask } from '../interfaces/task';
import {EditTaskType} from "../services/task.service";
import {ToastService} from "angular-toastify";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient, private _toastService: ToastService) {
  }
  url = 'http://localhost:5000/api/';
  getTasks(): Observable<ITask[]>{
    return this.http.get(`${this.url}tasks`)
      .pipe(map((result: any) => {
        return result.data;
      }));
  }
  addTask(text: string): Observable<ITask>{
    const body = {text , done: false};
      return this.http.post(`${this.url}task`, body)
        .pipe(
          map((result: any) => {
            return result.data;
          }));
  }
  deleteTask(task: ITask): Observable<ITask[]>{
    return this.http.delete(`${this.url}task?_id=${task._id}`)
      .pipe(
        map((result: any) => result.data));
  }
  editTask(action: any): Observable<ITask>{
      let valueKey: string;
      let value = action.value;
      if (action.valuetype === EditTaskType.editText){
       valueKey = 'text';
      } else {
        value = action.value.target.checked;
        valueKey = 'done';
      }
      const task: ITask = { ...action.item, [valueKey]: value};
    return this.http.patch(`${this.url}task`, task)
      .pipe(map(() => task));
  }
  doneAll(body: ITask[]): Observable<ITask[]>{
    return this.http.patch(`${this.url}tasks`, {body})
      .pipe(map((result: any) => result.data));
  }
}
