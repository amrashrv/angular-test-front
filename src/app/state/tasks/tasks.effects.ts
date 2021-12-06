import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, delay, map, mergeMap, retry, tap } from 'rxjs/operators';
import { ToastService } from 'angular-toastify';
import { of } from 'rxjs';

import { TasksService } from '../../api/tasks.service';
import * as TasksActions from './tasks.actions';
import * as AppActions from '../app/app.actions';
import { ITask } from 'src/app/interfaces/task';
import { AuthService } from '../../api/auth.service';

@Injectable()
export class TasksEffects {
  constructor(
    private apiService: TasksService,
    private actions$: Actions,
    private _toastService: ToastService,
    private authService: AuthService
  ) {
  }

  createMessage = (str: string) => str.substr(str.indexOf(']') + 2);

  handleError = (error: string) => {
    if (error === 'unauthorized') {
      this.authService.refreshToken().subscribe(result => {
         this.authService.setSession(result);
      });
      return of(TasksActions.loadTasks());
    } else {
      this._toastService.error(error);
      return of(AppActions.operationFailed());
    }
  };

  loadTasks$ = createEffect(() => this.actions$.pipe(
    ofType(TasksActions.loadTasks),
    mergeMap(() => this.apiService.getTasks().pipe(
      map(tasks => TasksActions.loadTasksSuccess({tasks})),
      catchError(error => {
        return this.handleError(error.error.message);
      })
    ))
  ));

  addTask$ = createEffect(() => this.actions$.pipe(
    ofType(TasksActions.addTask),
    mergeMap((action) => this.apiService.addTask(action.text).pipe(
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
        return TasksActions.clearAllCompletedSuccess({ids});
      }),
      catchError(error => this.handleError(error.error.message))
    ))
  ));
}
