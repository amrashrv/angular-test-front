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

  private readonly baseUrl = 'http://localhost:5000/api';

  getTasks(): Observable<ITask[]> {
    return this.http.get(`${this.baseUrl}/tasks`).pipe(
      map((result: any) => {
        return result.data;
      })
    );
  }

  addTask(text: string): Observable<ITask> {
    const body = {text , done: false};
      return this.http.post(`${this.baseUrl}/task`, body)
        .pipe(
          map((result: any) => {
            return result.data;
          }));
  }
  deleteTask(task: ITask): Observable<ITask[]>{
    const options = {
      params: {
        _id: task._id
      }
    };
    return this.http.delete(`${this.baseUrl}/task`, options).pipe(
        map((result: any) => {
          return result.data;
        })
    );
  }

  updateTaskIsCompleted(action: any): Observable<ITask>{
      const task: ITask = { ...action.task, done: action.done};
    return this.http.patch(`${this.baseUrl}/task`, task)
      .pipe(map(() => {
        return task;
      }));
  }

  updateTaskText(action: any): Observable<ITask>{
    const task: ITask = { ...action.task, text: action.text};
    return this.http.patch(`${this.baseUrl}/task`, task)
      .pipe(map(() => {
        return task;
      }));
  }

  updateAll(action: any): Observable<ITask[]>{
    return this.http.patch(`${this.baseUrl}/tasks`, {done: action})
      .pipe(map((result: any) => {
        console.log(result.data);
        return result.data;
      }));
  }
}
