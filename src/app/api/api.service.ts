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
      console.log(action);
      const task: ITask = { ...action.task, done: action.done};
      console.log(task);
    return this.http.patch(`${this.baseUrl}/task`, task)
      .pipe(map(() => {
        return task;
      }));
  }

  updateTaskText(action: any): Observable<ITask>{
    console.log(action);
    const task: ITask = { ...action.task, text: action.text};
    console.log(task);
    return this.http.patch(`${this.baseUrl}/task`, task)
      .pipe(map(() => {
        return task;
      }));
  }

  doneAll(body: ITask[]): Observable<ITask[]>{
    return this.http.patch(`${this.baseUrl}/tasks`, {body})
      .pipe(map((result: any) => {
        console.log(result.data);
        return result.data;
      }));
  }
}
