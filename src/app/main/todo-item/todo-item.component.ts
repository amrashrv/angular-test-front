import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { ITask } from '../../interfaces/task';
import { Store } from '@ngrx/store';
import { ApiService } from '../../api/api.service';
import * as taskActions from '../../state/tasks/tasks.actions';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})

export class TodoItemComponent {
  @Input() item: any;
  selectedItem?: ITask;
  checkboxFormControl = new FormControl();
  // subscription: Subscription;
  constructor(
    public apiService: ApiService,
    private store: Store) {
  }
  // ngOnInit() {
  //   this.subscription = this.checked.valueChanges
  //     .subscribe(value => console.log(value));
  // }
  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

  deleteTask(task: ITask): void {
    this.store.dispatch(taskActions.removeTask({task}));
  }

  updateTaskText(task: ITask, text: string) {
    this.store.dispatch(taskActions.updateTaskText({task, text}));
  }
  updateIsTaskCompleted(task: ITask, done: any) {
    console.log(done.target.checked);
    done = done.target.checked;
    this.store.dispatch(taskActions.updateIsTaskCompleted({task, done}));
  }
  // editTask(item: ITask, value: any, valuetype: EditTaskType) {
  //   this.store.dispatch(taskActions.update({item, value, valuetype}));
  // }

  onSelect(item: ITask) {
    this.selectedItem = item;
  }
}
