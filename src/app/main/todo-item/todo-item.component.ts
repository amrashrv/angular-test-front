import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Task, ApiService } from '../../services/api.service';
import { TaskService } from "../../services/task.service";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  providers: [TaskService],
})

export class TodoItemComponent implements OnInit{
  // @Input()
  @Input() todos: any;
  @Output() newArrayEvent = new EventEmitter<any>();
  selectedItem: any;
  constructor(private taskService: ApiService, private testService: TaskService) { }

  ngOnInit(): void {
    this.todos = this.testService.getTasks();
    // this.newArrayEvent.emit(this.todos);
  }
  deleteTask(task: Task): void {
    this.todos = this.testService.deleteTask(task, this.todos);
    // this.todos = this.testService.getTasks();
  }
  editTask(item: any, value: any){
    this.todos = this.testService.editTask(item, value, this.todos);
  }
  onSelect(item: Task) {
    this.selectedItem = '';
    this.selectedItem = item;
  }
}
