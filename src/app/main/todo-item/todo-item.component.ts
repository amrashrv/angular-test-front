import { Component, Directive, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

import { ITask } from '../../interfaces/task';
import { ApiService } from '../../api/api.service';
import * as taskActions from '../../state/tasks/tasks.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})

export class TodoItemComponent implements OnInit{
  @Input() item: any;
  @ViewChild('taskInput')
  set input(element: ElementRef<HTMLInputElement>) {
    if (element) {
      element.nativeElement.focus();
    }
  }
  selectedItem?: ITask;
  checked = false;
  autofocus = false;

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

  updateTaskText(task: ITask, event: Event) {
    const text = (event.target as HTMLInputElement).value;
    this.store.dispatch(taskActions.updateTaskText({task, text}));
  }

  updateIsTaskCompleted(task: ITask, done: boolean) {
    this.store.dispatch(taskActions.updateIsTaskCompleted({task, done}));
  }

  onCancelEditMode(){
    this.selectedItem = undefined;
  }

  onStartEditMode(item: ITask) {
    this.selectedItem = item;
    this.autofocus = true;

  }
}
