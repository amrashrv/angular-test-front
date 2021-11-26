import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ToastService } from 'angular-toastify';
import { of } from 'rxjs';

import { ApiService } from '../../api/api.service';
import * as TasksActions from './tasks.actions';
import * as AppActions from '../app/app.actions';
import { ITask } from 'src/app/interfaces/task';

@Injectable()
export class TasksEffects {
  constructor(
    private apiService: ApiService,
    private actions$: Actions,
    private _toastService: ToastService,
  ) {}

  handleError = (error: string) => {
    this._toastService.error(error);
    return of(AppActions.operationFailed());
  };

  loadTasks$ = createEffect( () => this.actions$.pipe(
    ofType(TasksActions.loadTasks),
    mergeMap(() => this.apiService.getTasks().pipe(
      map(tasks => TasksActions.loadTasksSuccess({ tasks })),
      catchError(error => this.handleError(error.error.message))
    ))
  ));

  addTask$ = createEffect(() => this.actions$.pipe(
    ofType(TasksActions.addTask),
    mergeMap(( action) => this.apiService.addTask(action.text).pipe(
      map((task: ITask) => {
        this._toastService.success('task added');
        return TasksActions.addTaskSuccess({task});
      }),
      catchError(error => this.handleError(error.error.message))
    ))
  ));

  updateIsTasCompleted$ = createEffect(() => this.actions$.pipe(
    ofType(TasksActions.updateIsTaskCompleted),
    mergeMap((action) => this.apiService.updateTaskIsCompleted(action).pipe(
      map(task => {
        this._toastService.success('task updated');
        return TasksActions.updateSuccess({task});
      }),
      catchError(error => this.handleError(error.error.message))
    ))
  ));

  updateTaskText$ = createEffect(() => this.actions$.pipe(
    ofType(TasksActions.updateTaskText),
    mergeMap((action) => this.apiService.updateTaskText(action).pipe(
      map(task => {
        this._toastService.success('task updated');
        return TasksActions.updateSuccess({task});
      }),
      catchError(error => this.handleError(error.error.message))
    ))
  ));

  markAllDone$ = createEffect(() => this.actions$.pipe(
    ofType(TasksActions.updateAll),
    mergeMap(() => this.apiService.doneAll([]).pipe(
      map(() => {
        this._toastService.success('all tasks done');
        return TasksActions.updateAllSuccess();
      }),
      catchError(error => this.handleError(error.error.message))
    ))
  ));

  deleteTask$ = createEffect(() => this.actions$.pipe(
    ofType(TasksActions.removeTask),
    mergeMap((action) => this.apiService.deleteTask(action.task).pipe(
      map(result => {
        const task = action.task;
        this._toastService.success('task deleted');
        return TasksActions.removeTaskSuccess({task});
      }),
      catchError(error => this.handleError(error.error.message))
    ))
  ));
}
