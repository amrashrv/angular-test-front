import { Injectable } from '@angular/core';
import { Actions , createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
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

  createMessage = (str: string) => {
    str = str.substr(str.indexOf(']') + 2);
    return str;
  };

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
      tap(() => this._toastService.success(this.createMessage(action.type))),
      map((task: ITask) => {
        return TasksActions.addTaskSuccess({task});
      }),
      catchError(error => this.handleError(error.error.message))
    ))
  ));

  updateIsTaskCompleted$ = createEffect(() => this.actions$.pipe(
    ofType(TasksActions.updateIsTaskCompleted),
    mergeMap((action) => this.apiService.updateTaskIsCompleted(action).pipe(
      tap(() => this._toastService.success(this.createMessage(action.type))),
      map(task => {
        return TasksActions.updateSuccess({task});
      }),
      catchError(error => this.handleError(error.error.message))
    ))
  ));

  updateTaskText$ = createEffect(() => this.actions$.pipe(
    ofType(TasksActions.updateTaskText),
    mergeMap((action) => this.apiService.updateTaskText(action).pipe(
      tap(() => this._toastService.success(this.createMessage(action.type))),
      map(task => {
        return TasksActions.updateSuccess({task});
      }),
      catchError(error => this.handleError(error.error.message))
    ))
  ));

  updateAllTasks$ = createEffect(() => this.actions$.pipe(
    ofType(TasksActions.updateAll),
    mergeMap((action) => this.apiService.updateAll(action.done).pipe(
      tap(() => this._toastService.success(this.createMessage(action.type))),
      map((action) => {
        const tasks: ITask[] = action;
        return TasksActions.updateAllSuccess({tasks});
      }),
      catchError(error => this.handleError(error.error.message))
    ))
  ));

  deleteTask$ = createEffect(() => this.actions$.pipe(
    ofType(TasksActions.removeTask),
    mergeMap((action) => this.apiService.deleteTask(action.task).pipe(
      tap(() => this._toastService.success(this.createMessage(action.type))),
      map(result => {
        const task = action.task;
        return TasksActions.removeTaskSuccess({task});
      }),
      catchError(error => this.handleError(error.error.message))
    ))
  ));

  clearAllCompleted$ = createEffect(() => this.actions$.pipe(
    ofType(TasksActions.clearAllCompleted),
    mergeMap((action) => this.apiService.clearAll().pipe(
      tap(() => this._toastService.success(this.createMessage(action.type))),
      map((ids: any) => {
        return TasksActions.clearAllCompletedSuccess({ids})
      }),
      catchError(error => this.handleError(error.error.message))
  ))
  ));
}
