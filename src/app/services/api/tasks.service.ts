import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ITask } from '../../interfaces/task';


@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) {
  }
  // http://localhost:5000/api
  // https://todo-list-back-angular.herokuapp.com/api
  private readonly baseUrl = 'http://localhost:5000/api';
  private readonly taskBaseUrl = `${this.baseUrl}/task`;
  private readonly tasksBaseUrl = `${this.baseUrl}/tasks`;

  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(`${this.tasksBaseUrl}`);
  }

  addTask(text: string): Observable<ITask> {
    const body = {text, done: false};
    return this.http.post<ITask>(`${this.taskBaseUrl}`, body);
  }

  deleteTask(task: ITask): Observable<ITask[]> {
    const options = {
      params: {
        _id: task._id
      }
    };
    return this.http.delete<ITask[]>(`${this.taskBaseUrl}`, options);
  }

  updateTaskIsCompleted(task: ITask, done: boolean): Observable<ITask> {
    const updatedTask: ITask = {...task, done};
    return this.http.patch(`${this.taskBaseUrl}`, updatedTask)
      .pipe(
        map(() => updatedTask)
      );
  }

  updateTaskText(task: ITask, text: string): Observable<ITask> {
    const updatedTask: ITask = {...task, text};
    return this.http.patch(`${this.taskBaseUrl}`, updatedTask)
      .pipe(
        map(() => updatedTask)
      );
  }

  updateAll(done: boolean): Observable<ITask[]> {
    console.log(done);
    return this.http.patch<ITask[]>(`${this.tasksBaseUrl}`, {done});
  }

  clearAll(): Observable<string[]> {
    return this.http.delete<string[]>(`${this.tasksBaseUrl}`);
  }
}
