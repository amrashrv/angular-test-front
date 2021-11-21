import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../task';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {
  }
  getTasks(): Observable<Task[]>{
    return this.http.get('http://localhost:5000/api/tasks')
      .pipe(map((result: any) => {
        return result.data;
      }));
  }
  addTask(body: Task): Observable<Task>{
    return this.http.post('http://localhost:5000/api/task', body)
      .pipe(map((result: any) => result.data));
  }
  deleteTask(task: Task): Observable<Task[]>{
    return this.http.delete(`http://localhost:5000/api/task?_id=${task._id}`)
      .pipe(map((result: any) => result.data));
  }
  editTask(body: Task): Observable<Task>{
    return this.http.patch('http://localhost:5000/api/task', body)
      .pipe(map((result: any) => result.data));
  }
  doneAll(body: Task[]): Observable<Task>{
    return this.http.patch('http://localhost:5000/api/tasks', body)
      .pipe(map((result: any) => result.data));
  }
}
// export class Task {
//   constructor(public text: string, public done: boolean) {
//   }
// }
