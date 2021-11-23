import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { ITask } from '../interfaces/task';

export enum EditTaskType {
  check,
  editText
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  todos: ITask[] = [];
  count: any = 0;

  constructor(private apiService: ApiService) {
  }

  getTasks(){
    this.apiService.getTasks().subscribe((result: ITask[]) => {
      this.todos = result;
      this.setCount();
    });
  }

  addNewData(str: string) {
    const body: ITask = {text: str, done: false};
    this.apiService.addTask(body).subscribe((result: ITask) => {
      this.todos.push(result);
      this.count++;
    });
  }

  deleteTask(task: ITask) {
    if (!task.done){
      this.count--;
    }
    this.apiService.deleteTask(task).subscribe(() => {
      this.todos = this.todos.filter((item: ITask) => item._id !== task._id);
    });
  }

  doneAll(){
    this.apiService.doneAll(this.todos).subscribe((result: any) => {
      this.todos.forEach((elem: ITask) => {
          elem.done = true;
      });
      this.count = 0;
    });
  }
  filter(value: string) {
    this.apiService.getTasks().subscribe((result: ITask[]) => {
      if (value && value === 'completed') {
        this.todos = result.filter((item: ITask) => item.done);
      }
      if (value && value === 'active') {
        this.todos = result.filter((item: ITask) => !item.done);
      }
    });
  }
  editTask(item: any, value: any, type: EditTaskType) {
    let task = {};
    let valueKey: string;
    if (type === EditTaskType.editText){
      valueKey = 'text';
    } else {
      value = value.target.checked;
      if (value === true) {
        this.count--;
      } else {
        this.count++;
      }
      valueKey = 'done';
    }
    this.apiService.editTask({...item, [valueKey]: value}).subscribe(result => {
      this.todos.forEach((elem: ITask) => {
        if ( elem._id === item._id) {
          item[valueKey] = value;
          task = item;
        }
      });
    });
  }
  setCount() {
    const arr = [];
    this.todos.forEach(item => {
      if (!item.done){
        arr.push(item);
        this.count = arr.length;
      }
    });
  }
}
