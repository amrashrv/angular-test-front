import { Injectable } from '@angular/core';
import { ApiService, Task } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private apiService: ApiService) { }

  getTasks(){
    const res: any = [];
    this.apiService.getTasks().subscribe((result: any) => {
        result.forEach((item: any) => {
          res.push(item);
        });
    });
    return res;
  }
  addNewData(task: string, todos: any) {
    const body: Task = {
      text: task,
      done: false
    };
    this.apiService.addTask(body).subscribe((result: Task) => {
      todos.push(result);
    });
    return todos;
  }
  deleteTask(task: any, todos: Task[]) {
    this.apiService.deleteTask(task).subscribe((result: any) => {
        return todos.filter((item: any) => item._id !== task._id);
    });
  }
  editTask(item: any, value: any, todos: any) {
    let task = {};
    let valueKey: string;
    if (typeof value === 'string') {
      valueKey = 'text';
    } else {
      value = value.target.checked;
      valueKey = 'done';
    }
    this.apiService.editTask({...item, [valueKey]: value}).subscribe(result => {
      todos.map((elem: any) => {
        if ( elem._id === item._id) {
          item[valueKey] = value;
          task = item;
        }
      });
    });
    return todos;
  }
}

