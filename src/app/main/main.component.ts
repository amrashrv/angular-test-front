import { Component, OnInit } from '@angular/core';
import { Task, ApiService } from '../services/api.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [ApiService, TaskService]
})

export class MainComponent {
  todos: Task[] = [];
  constructor(private taskService: ApiService, private testService: TaskService) {
  }

  addNewData(task: string){
    this.todos = this.testService.addNewData(task, this.todos);
  }
  setCount(){
    const arr = [];
    this.todos.forEach(item => {
      if (!item.done){
        arr.push(item);
      }
    });
    return (arr.length);
  }
}
