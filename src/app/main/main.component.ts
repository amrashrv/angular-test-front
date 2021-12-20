import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';

import * as taskActions from '../state/tasks/tasks.actions';
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
import { TASKS_FILTER } from '../consts/consts';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  readonly filterType = TASKS_FILTER;
  public tasks$: Observable<ITask[]> = this.store.select(selectAllTasks);
  public activeTasksCounter$: Observable<number> = this.store.select(selectCompletedTasksCounter);
  public isLoading$: Observable<boolean> = this.store.select(selectIsLoading);
  public selectedType: TASKS_FILTER;
  public allTasksCompletedStatus: boolean;
  private tasks: ITask[] = [];

  newTaskFormControl = new FormControl('', [
      Validators.required,
      Validators.maxLength(60)
    ]
  );

  readonly filterStates = [{
    type: TASKS_FILTER.all,
    label: 'All'
  }, {
    type: TASKS_FILTER.active,
    label: 'Active'
  }, {
    type: TASKS_FILTER.completed,
    label: 'Completed'
  }];

  constructor(
    private authService: AuthService,
    private store: Store<IState>,
    private validationService: TaskValidationService,
  ) {
    this.selectedType = this.filterType.all;
    this.allTasksCompletedStatus = false;
  }

  ngOnInit(): void {
    this.store.dispatch(taskActions.loadTasks());
    this.tasks$.subscribe(result => this.tasks = result);
  }

  setAllTasksCompleted(): void {
    this.allTasksCompletedStatus = !this.allTasksCompletedStatus;
    if (this.tasks.length > 0) {
      this.store.dispatch(taskActions.updateAll({done: this.allTasksCompletedStatus}));
    }
  }

  clearAllCompletedTasks(): void {
    const completedTasks = this.tasks.filter(task => task.done);
    if (completedTasks.length > 0) {
      const ids = completedTasks.map(task => task._id);
      console.log(ids);
      this.store.dispatch(taskActions.clearAllCompleted({ids}));
    }
  }

  addTask(): void {
    if (this.validationService.taskValidation(this.newTaskFormControl)) {
      const text = this.newTaskFormControl.value;
      this.store.dispatch(taskActions.addTask({text}));
      this.newTaskFormControl.setValue('');
    }
  }

  logout(): void {
    this.store.dispatch(taskActions.clearState());
    this.authService.logout();
  }

  updateFilterType(type: TASKS_FILTER): void {
    this.selectedType = type;
    this.tasks$ = this.store.select(getAllTasks(type));
  }
}
