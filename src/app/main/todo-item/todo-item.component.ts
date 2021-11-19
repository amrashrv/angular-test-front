import { Component, Input } from '@angular/core';
import { EditTaskType, TaskService } from '../../services/task.service';
import { Task } from '../../task';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})

export class TodoItemComponent {
  @Input() item: any;
  selectedItem: any;
  public editType = EditTaskType;
  constructor(public testService: TaskService) {}

  deleteTask(task: Task): void {
    this.testService.deleteTask(task);
  }
  editTask(item: any, value: any, type: EditTaskType){
    this.testService.editTask(item, value, type);
  }
  onSelect(item: Task) {
    this.selectedItem = '';
    this.selectedItem = item;
  }
}
