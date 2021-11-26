import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastService } from 'angular-toastify';

import * as taskActions from '../state/tasks/tasks.actions';
import { ApiService } from '../api/api.service';
import { getAllTasks, selectCompletedTasksCounter } from '../state/tasks/tasks.selectors';
import { IState } from '../state/state.model';
import { selectIsLoading } from '../state/app/app.selectors';
import { FormControl, Validators } from '@angular/forms';

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
    private _toastService: ToastService) {
  }
  newTaskFormControl = new FormControl('',
    [Validators.required,
      Validators.maxLength(40)] );

  changeValue(){
    console.log(this.newTaskFormControl);
    this.newTaskFormControl.status === 'INVALID'
      ? console.log(this.newTaskFormControl.errors)
      : this.addTask(this.newTaskFormControl.value);
    this.newTaskFormControl.setValue('');
  }
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
  tasks$ = this.store.select(getAllTasks(FilterType.all));
  counter = this.store.select(selectCompletedTasksCounter);
  isLoading$ = this.store.select(selectIsLoading);

  ngOnInit() {
    this.store.dispatch(taskActions.loadTasks());
  }

  markAllTasksDone() {
    this.store.dispatch(taskActions.updateAll());
  }

  addTask(text: string){
    this.store.dispatch(taskActions.addTask({text}));
  }

  updateFilterType(type: FilterType) {
    this.tasks$ = this.store.select(getAllTasks(type));
  }
}
