import { Injectable } from '@angular/core';
import {map} from "rxjs/operators";
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
  addTask(body: any): Observable<any>{
    return this.http.post('http://localhost:5000/tasks', body)
      .pipe(map((result: any) => result.data))
  }
}
export class Task {
  constructor(public text: string, public done: boolean) {
  }
}
