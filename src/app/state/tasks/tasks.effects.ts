import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../api/api.service';
import { catchError, map, mergeMap, tap} from 'rxjs/operators';
import { of } from 'rxjs';
import * as TasksActions from './tasks.actions';
import { ITask } from 'src/app/interfaces/task';
import { ToastService } from 'angular-toastify';
import { TaskService } from '../../services/task.service';

@Injectable()
export class TasksEffects {
  loadTasks$ = createEffect( () => this.actions$.pipe(
    ofType(TasksActions.loadTasks),
    mergeMap(() => this.apiService.getTasks()
      .pipe(
        map(tasks => TasksActions.loadTasksSuccess({ tasks })),
        catchError((error) => of (this.taskService.errorHandler(error.statusText))
      )))
  ));

  addTask$ = createEffect(() => this.actions$.pipe(
        ofType(TasksActions.addTask),
        mergeMap(( action) => this.apiService.addTask(action.text)
          .pipe(
            map((task: ITask) => {
              this._toastService.success('task added');
              return TasksActions.addTaskSuccess({task});
            }),
            catchError((error) => of (this.taskService.errorHandler(error.statusText))
        ))
      )
  ));

  update$ = createEffect(() => this.actions$.pipe(
    ofType(TasksActions.update),
    mergeMap((action) => this.apiService.editTask(action).pipe(
      map(task => {
        this._toastService.success('task updated');
        return TasksActions.updateSuccess({task});
      }),
      catchError((error) => of (this.taskService.errorHandler(error.statusText)))
      ))
  ));

  updateAll$ = createEffect(() => this.actions$.pipe(
    ofType(TasksActions.updateAll),
    mergeMap(() => this.apiService.doneAll([])
      .pipe(
        map(result => {
          this._toastService.success('all tasks done');
          return TasksActions.updateAllSuccess();
        }),
        catchError(error => of (this.taskService.errorHandler(error.statusText))))
    ))
  );

  deleteTask$ = createEffect(() => this.actions$.pipe(
      ofType(TasksActions.removeTask),
      mergeMap((action) => this.apiService.deleteTask(action.task).pipe(
        map(result => {
          const task = action.task;
          this._toastService.success('task deleted');
          return TasksActions.removeTaskSuccess({task});
        }),
        catchError((error) => of (this.taskService.errorHandler(error.statusText)))
      ))
  ));
  constructor(
    private apiService: ApiService,
    private actions$: Actions,
    private _toastService: ToastService,
    private taskService: TaskService
  ) {}
}
