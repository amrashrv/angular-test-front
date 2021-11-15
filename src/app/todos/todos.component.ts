import {Component, Input, OnInit} from '@angular/core';
import {Task} from "../task";
import {TaskService} from "../task.service";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})

export class TodosComponent implements OnInit {
  title = "toDo"
  todos: Task[] = []
  constructor(private taskService: TaskService) { }
  getTasks(): void {
    this.todos = this.taskService.getTasks()
  }
  ngOnInit(): void {
    this.getTasks()
  }
  selectedTask?: Task;
  onSelect(task: Task): void {
    this.selectedTask = task;
    console.log(task)
  }
  changeStatus(task: any): void {
    console.log(window)
    this.selectedTask = task;
    task.isChecked = !task.isChecked;
  }
}
