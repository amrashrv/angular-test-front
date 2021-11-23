import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITask } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {
  }
  url = 'http://localhost:5000/api/';
  getTasks(): Observable<ITask[]>{
    return this.http.get(`${this.url}tasks`)
      .pipe(map((result: any) => {
        return result.data;
      }));
  }
  addTask(body: ITask): Observable<ITask>{
    return this.http.post(`${this.url}task`, body)
      .pipe(map((result: any) => result.data));
  }
  deleteTask(task: ITask): Observable<ITask[]>{
    return this.http.delete(`${this.url}task?_id=${task._id}`)
      .pipe(map((result: any) => result.data));
  }
  editTask(body: ITask): Observable<ITask>{
    return this.http.patch(`${this.url}task`, body)
      .pipe(map((result: any) => result.data));
  }
  doneAll(body: ITask[]): Observable<ITask[]>{
    return this.http.patch(`${this.url}tasks`, {body})
      .pipe(map((result: any) => result.data));
  }
}
