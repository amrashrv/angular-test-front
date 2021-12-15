import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ToastService } from 'angular-toastify';
import { FormControl, Validators } from '@angular/forms';

import * as taskActions from '../state/tasks/tasks.actions';
import { TasksService } from '../services/api/tasks.service';
import {
  getAllTasks,
  selectAllTasks,
  selectCompletedTasksCounter
} from '../state/tasks/tasks.selectors';
import { IState } from '../state/state.model';
import { selectIsLoading } from '../state/app/app.selectors';
import { TaskValidationService } from '../services/task-validation.service';
import { AuthService } from '../services/api/auth.service';
import { ITask } from '../interfaces/task';

export enum FilterType {
  all,
  active,
  completed
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  readonly filterType = FilterType;
  public tasks$: Observable<ITask[]> = this.store.select(selectAllTasks);
  public counter: Observable<number> = this.store.select(selectCompletedTasksCounter);
  public isLoading$: Observable<boolean> = this.store.select(selectIsLoading);
  public selectedType: FilterType;
  public markAll: boolean;


  newTaskFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(60)
    ]
  );

  readonly filterStates = [{
    type: FilterType.all,
    label: 'All'
  }, {
    type: FilterType.active,
    label: 'Active'
  }, {
    type: FilterType.completed,
    label: 'Completed'
  }];

  constructor(
    private apiService: TasksService,
    private authService: AuthService,
    private store: Store<IState>,
    private _toastService: ToastService,
    private validationService: TaskValidationService,
    ) {
    this.selectedType = this.filterType.all;
    this.markAll = false;
  }

  ngOnInit() {
    this.store.dispatch(taskActions.loadTasks());
  }

  markAllTasksDone() {
    this.markAll = !this.markAll;
    this.store.dispatch(taskActions.updateAll({done: this.markAll}));
  }

  clearAllCompleted() {
    this.store.dispatch(taskActions.clearAllCompleted());
  }

  addTask() {
    if (this.validationService.taskValidation(this.newTaskFormControl)) {
      const text = this.newTaskFormControl.value;
      this.store.dispatch(taskActions.addTask({text}));
      this.newTaskFormControl.setValue('');
    }
  }

  logout() {
    this.store.dispatch(taskActions.clearState());
    this.authService.logout();
  }

  updateFilterType(type: FilterType) {
    this.selectedType = type;
    this.tasks$ = this.store.select(getAllTasks(type));
  }
}
