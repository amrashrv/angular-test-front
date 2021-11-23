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
  getTasks(): Observable<ITask[]>{
    return this.http.get('http://localhost:5000/api/tasks')
      .pipe(map((result: any) => {
        return result.data;
      }));
  }
  addTask(body: ITask): Observable<ITask>{
    return this.http.post('http://localhost:5000/api/task', body)
      .pipe(map((result: any) => result.data));
  }
  deleteTask(task: ITask): Observable<ITask[]>{
    return this.http.delete(`http://localhost:5000/api/task?_id=${task._id}`)
      .pipe(map((result: any) => result.data));
  }
  editTask(body: ITask): Observable<ITask>{
    return this.http.patch('http://localhost:5000/api/task', body)
      .pipe(map((result: any) => result.data));
  }
  doneAll(body: ITask[]): Observable<ITask>{
    return this.http.patch('http://localhost:5000/api/tasks', body)
      .pipe(map((result: any) => result.data));
  }
}
// export class Task {
//   constructor(public text: string, public done: boolean) {
//   }
// }
