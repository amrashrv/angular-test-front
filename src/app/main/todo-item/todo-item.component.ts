import { Component, Input, OnInit } from '@angular/core';
import { ITask } from '../../interfaces/task';
import { Store } from '@ngrx/store';
import { ApiService } from '../../api/api.service';
import * as taskActions from '../../state/tasks/tasks.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})

export class TodoItemComponent implements OnInit{
  @Input() item: any;
  selectedItem?: ITask;
  checked = false;

  constructor(
    public apiService: ApiService,
    private store: Store) {
  }
  ngOnInit() {
    this.checked = this.item.done;
  }

  deleteTask(task: ITask): void {
    this.store.dispatch(taskActions.removeTask({task}));
  }

  updateTaskText(task: ITask, text: string) {
    this.store.dispatch(taskActions.updateTaskText({task, text}));
  }

  updateIsTaskCompleted(task: ITask, done: boolean) {
    this.store.dispatch(taskActions.updateIsTaskCompleted({task, done}));
  }
  blurEvent(){
    this.selectedItem = undefined;
  }
  onSelect(item: ITask) {
    this.selectedItem = item;
  }
}
