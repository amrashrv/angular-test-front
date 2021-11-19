import { Injectable, OnChanges, SimpleChanges} from '@angular/core';
import { ApiService } from '../api/api.service';
import { Task } from '../task';

export enum EditTaskType {
  check,
  editText
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  todos: Task[] = [];
  count: any = 0;

  constructor(private apiService: ApiService) {
  }

  getTasks(){
    this.apiService.getTasks().subscribe((result: Task[]) => {
      this.todos = result;
      this.setCount();
    });
  }
  addNewData(str: string) {
    const body: Task = {text: str, done: false};
    this.apiService.addTask(body).subscribe((result: Task) => {
      this.todos.push(result);
      this.count++;
    });
  }
  deleteTask(task: Task) {
    if (!task.done){
      this.count--;
    }
    this.apiService.deleteTask(task).subscribe(() => {
      this.todos = this.todos.filter((item: Task) => item._id !== task._id);
    });
  }
  doneAll(){
    this.apiService.doneAll(this.todos).subscribe((result: any) => {
      this.todos.forEach((elem: Task) => {
          elem.done = true;
      });
      this.count = 0;
    });
  }
  filter(value: string) {
    this.apiService.getTasks().subscribe((result: Task[]) => {
      if (value && value === 'completed') {
        this.todos = result.filter((item: Task) => item.done);
      }
      if (value && value === 'active') {
        this.todos = result.filter((item: Task) => !item.done);
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
      this.todos.forEach((elem: Task) => {
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
