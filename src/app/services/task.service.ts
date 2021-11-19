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
export class TaskService implements OnChanges{
  todos: Task[] = [];
  count: any = 0;
  filtersOn: boolean = false;

  constructor(private apiService: ApiService) {
  }
  ngOnChanges(changes: SimpleChanges) {
    this.setCount();
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
      this.setCount();
    });
  }
  deleteTask(task: Task) {
    this.apiService.deleteTask(task).subscribe(() => {
      this.todos = this.todos.filter((item: Task) => item._id !== task._id);
      this.setCount();
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
    this.filtersOn = true;
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
      valueKey = 'done';
    }
    this.apiService.editTask({...item, [valueKey]: value}).subscribe(result => {
      this.todos.forEach((elem: Task) => {
        if ( elem._id === item._id) {
          item[valueKey] = value;
          task = item;
          this.setCount();
        }
      });
    });
  }
  setCount() {
    const arr = [];
    if (this.filtersOn){
      this.apiService.getTasks().subscribe(result => {
        result.forEach(item => {
          if (!item.done) {
            arr.push(item);
            this.count = arr.length;
          }
        });
      });
    } else {
      this.todos.forEach(item => {
        if (!item.done){
          arr.push(item);
          this.count = arr.length;
        }
      });
    }
  }
}
