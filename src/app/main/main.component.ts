import {Component, OnInit} from '@angular/core';
import {Task, TaskService} from "../services/task.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [TaskService]
})

export class MainComponent implements OnInit {
  todos: Task[] = []
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((result) => {
      this.todos = result
    })
  }
  addNewData(task: string) {
    const body: Task = {
      text: task,
      done: false
    }
    this.taskService.addTask(body).subscribe(result => {
      this.todos.push(result);
    })
  }
  onNewItemEvent(item: Task[]): void {
    this.todos = item
  }
}
