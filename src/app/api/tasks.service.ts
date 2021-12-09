import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITask } from '../interfaces/task';


@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(private http: HttpClient) {
  }

  private readonly baseUrl = 'http://localhost:5000/api';

  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(`${this.baseUrl}/tasks`)
      .pipe(
        map(result => result)
      );
  }

  addTask(text: string): Observable<ITask> {
    const body = {text, done: false};
    return this.http.post<ITask>(`${this.baseUrl}/task`, body)
      .pipe(
        map((result) => {
          return result;
        }));
  }

  deleteTask(task: ITask): Observable<ITask[]> {
    const options = {
      params: {
        _id: task._id
      }
    };
    return this.http.delete<ITask[]>(`${this.baseUrl}/task`, options)
      .pipe(
        map(result => result)
      );
  }

  updateTaskIsCompleted(action: any): Observable<ITask> {
    const task: ITask = {...action.task, done: action.done};
    return this.http.patch(`${this.baseUrl}/task`, task)
      .pipe(
        map(() => task)
      );
  }

  updateTaskText(action: any): Observable<ITask> {
    const task: ITask = {...action.task, text: action.text};
    return this.http.patch(`${this.baseUrl}/task`, task)
      .pipe(
        map(() => task)
      );
  }

  updateAll(action: any): Observable<ITask[]> {
    return this.http.patch<ITask[]>(`${this.baseUrl}/tasks`, {done: action})
      .pipe(
        map(result => result)
      );
  }

  clearAll(): Observable<ITask[]> {
    return this.http.delete<ITask[]>(`${this.baseUrl}/tasks`)
      .pipe(
        map(result => result)
      );
  }
}
