import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { ToastService } from 'angular-toastify';
import { of } from 'rxjs';

import { TasksService } from '../../services/api/tasks.service';
import * as TasksActions from './tasks.actions';
import * as AppActions from '../app/app.actions';
import { ITask } from 'src/app/interfaces/task';

@Injectable()
export class TasksEffects {
  constructor(
    private apiService: TasksService,
    private actions$: Actions,
    private toastService: ToastService,
  ) {
  }

  createMessage = (errorMessage: string) => {
    console.log(errorMessage);
    return errorMessage ? errorMessage.substr(errorMessage.indexOf(']') + 2) : 'NO CONNECTION';
  };

  handleError = (error: string) => {
    this.toastService.error(error);
    return of(AppActions.operationFailed());
  };

  loadTasks$ = createEffect(() => {
 return this.actions$.pipe(
    ofType(TasksActions.loadTasks),
    mergeMap(() => this.apiService.getTasks().pipe(
      map(tasks => TasksActions.loadTasksSuccess({tasks})),
      catchError(error => {
        return this.handleError(error.error.message);
      })
    ))
  );
});

  addTask$ = createEffect(() => {
 return this.actions$.pipe(
    ofType(TasksActions.addTask),
    mergeMap((action) => this.apiService.addTask(action.text).pipe(
      map((task: ITask) => {
        return TasksActions.addTaskSuccess({task});
      }),
      catchError(error => this.handleError(error.error.message))
    ))
  );
});

  updateIsTaskCompleted$ = createEffect(() => {
 return this.actions$.pipe(
    ofType(TasksActions.updateTaskStatus),
    mergeMap((action) => this.apiService.updateTaskIsCompleted(action.task, action.done).pipe(
      map(task => {
        return TasksActions.updateSuccess({task});
      }),
      catchError(error => this.handleError(error.error.message))
    ))
  );
});

  updateTaskText$ = createEffect(() => {
 return this.actions$.pipe(
    ofType(TasksActions.updateTaskText),
    mergeMap((action) => this.apiService.updateTaskText(action.task, action.text).pipe(
      map(task => {
        return TasksActions.updateSuccess({task});
      }),
      catchError(error => this.handleError(error.error.message))
    ))
  );
});

  updateAllTasks$ = createEffect(() => {
 return this.actions$.pipe(
    ofType(TasksActions.updateAll),
    mergeMap((action) => this.apiService.updateAll(action.done).pipe(
      map((action) => {
        const tasks: ITask[] = action;
        return TasksActions.updateAllSuccess({tasks});
      }),
      catchError(error => this.handleError(error.error.message))
    ))
  );
});

  deleteTask$ = createEffect(() => {
 return this.actions$.pipe(
    ofType(TasksActions.removeTask),
    mergeMap((action) => this.apiService.deleteTask(action.task).pipe(
      map(() => {
        const task = action.task;
        return TasksActions.removeTaskSuccess({task});
      }),
      catchError(error => this.handleError(error.error.message))
    ))
  );
});

  clearAllCompleted$ = createEffect(() => {
 return this.actions$.pipe(
    ofType(TasksActions.clearAllCompleted),
    mergeMap((ids) => this.apiService.clearAll().pipe(
      map(() => {
        return TasksActions.clearAllCompletedSuccess(ids);
      }),
      catchError(error => this.handleError(error.error.message))
    ))
  );
});
}
