import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastService } from 'angular-toastify';

import * as taskActions from '../state/tasks/tasks.actions';
import { ApiService } from '../api/api.service';
import {
  getAllTasks,
  selectAllTasks,
  selectCompletedTasksCounter
} from '../state/tasks/tasks.selectors';
import { IState } from '../state/state.model';
import { selectIsLoading } from '../state/app/app.selectors';
import { FormControl, Validators } from '@angular/forms';
import { TaskValidationService } from '../services/task-validation.service';

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

  constructor(
    public apiService: ApiService,
    private store: Store<IState>,
    private _toastService: ToastService,
    private validationService: TaskValidationService) {
  }
  newTaskFormControl = new FormControl('', [Validators.required, Validators.maxLength(60)]
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

  filterType = FilterType;
  tasks$ = this.store.select(selectAllTasks);
  counter = this.store.select(selectCompletedTasksCounter);
  isLoading$ = this.store.select(selectIsLoading);

  ngOnInit() {
    this.store.dispatch(taskActions.loadTasks());
  }

  markAllTasksDone() {
    this.store.dispatch(taskActions.updateAll({done: true}));
  }

  clearAllCompleted(){
    const ids: any = [];
    console.log(this.tasks$);
    console.log(ids);
    this.store.dispatch(taskActions.clearAllCompleted());
  }

  addTask(){
    if ( this.validationService.taskValidation(this.newTaskFormControl)){
      const text = this.newTaskFormControl.value;
      this.store.dispatch(taskActions.addTask({text}));
      this.newTaskFormControl.setValue('');
    }
  }

  updateFilterType(type: FilterType) {
    this.tasks$ = this.store.select(getAllTasks(type));
  }
}
