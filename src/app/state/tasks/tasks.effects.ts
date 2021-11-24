import { Injectable } from '@angular/core';
import {Actions, concatLatestFrom, createEffect, Effect, ofType} from '@ngrx/effects';
import { ApiService } from '../../api/api.service';
import { catchError, exhaustMap, map, mergeMap, switchMap, switchMapTo, tap} from 'rxjs/operators';
import {EMPTY, Observable, of} from 'rxjs';
import * as TasksActions from './tasks.actions';
import {select, Store} from '@ngrx/store';
import { ITasksState } from './tasks.model';
import { ITask } from 'src/app/interfaces/task';
import { EditTaskType } from 'src/app/services/task.service';

@Injectable()
export class TasksEffects {

  loadTasks$ = createEffect( () => this.actions$.pipe(
    ofType(TasksActions.loadTasks),
    mergeMap(() => this.apiService.getTasks()
      .pipe(
        map(tasks => TasksActions.loadTasksSuccess({ tasks })),
        catchError(() => EMPTY)
      ))
  ));

  addTask$ = createEffect(() => this.actions$.pipe(
        ofType(TasksActions.addTask),
        mergeMap(( action) => this.apiService.addTask(action.text)
          .pipe(
            map((task: ITask) => TasksActions.addTaskSuccess({task})),
            catchError(() => EMPTY)
        ))
      )
  );

  update$ = createEffect(() => this.actions$.pipe(
    ofType(TasksActions.update),
    mergeMap((action) => this.apiService.editTask(action).pipe(
      map(task => TasksActions.updateSuccess({task})),
      catchError(() => EMPTY)
      ))
  ));

  updateAll$ = createEffect(() => this.actions$.pipe(
    ofType(TasksActions.updateAll),
    mergeMap(() => this.apiService.doneAll([])
      .pipe(
        map(result => TasksActions.updateAllSuccess()),
        catchError(err => EMPTY))
    ))
  );

  deleteTask$ = createEffect(() => this.actions$.pipe(
      ofType(TasksActions.removeTask),
      mergeMap((action) => this.apiService.deleteTask(action.task).pipe(
        map(result => {
          const task = action.task;
          return TasksActions.removeTaskSuccess({task});
        }),
        catchError(err => EMPTY)
      ))
  ));

  constructor(
    private apiService: ApiService,
    private actions$: Actions,
    private store: Store<{tasks: ITasksState}>
  ) {}
}
