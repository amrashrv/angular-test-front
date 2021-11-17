import {Component, EventEmitter, Injectable, Input, OnInit, Output} from '@angular/core';
import {Task, TaskService} from "../../services/task.service";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  providers: [TaskService],
})

export class TodoItemComponent implements OnInit {
  @Input('item') item : any;
  @Input('todos') todos: any;
  @Output() newItemEvent = new EventEmitter<any>();
  selectedTask?: Task;


  constructor(private taskService: TaskService) { }

  ngOnInit(): void {

  }
  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe((result) => {
      this.todos = result
      this.newItemEvent.emit(result)
    })
  }

  onSelect(task: Task): void {
    this.selectedTask = task;
  }
}
