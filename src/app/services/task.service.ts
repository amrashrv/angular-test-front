import { Injectable } from '@angular/core';
import {map, tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http: HttpClient) {
  }
  getTasks(): Observable<any>{
    return this.http.get('http://localhost:5000/tasks')
      .pipe(map((result: any) => {
        return result.data}))
  }
  addTask(body: Task): Observable<Task>{
    return this.http.post('http://localhost:5000/tasks', body)
      .pipe(map((result: any) => result.data))
  }
  deleteTask(task: any): Observable<Task>{
    return this.http.delete(`http://localhost:5000/tasks?_id=${task._id}`,)
      .pipe(map((result: any) => result.data))
  }
  checkIsDone(body: any): Observable<Task>{
    return this.http.patch('http://localhost:5000/tasks', body)
      .pipe(map((result: any) => result.data))
  }
}
export class Task {
  constructor(public text: string, public done: boolean) {
  }
}
