import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../api/api.service';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {addTask, addTaskSuccess, loadTasks, loadTasksSuccess, remove} from './tasks.actions';
import { Store } from '@ngrx/store';
import { ITasksState } from './tasks.model';
import {ITask} from "../../interfaces/task";

@Injectable()
export class TasksEffects {
  loadTasks$ = createEffect( () => this.actions$.pipe(
    ofType(loadTasks),
    mergeMap(() => this.apiService.getTasks()
      .pipe(
        map(tasks => loadTasksSuccess({ tasks })),
        catchError(() => EMPTY)
      ))
  ));
  addTask$ = createEffect(() => this.actions$.pipe(
        ofType(addTask),
        concatLatestFrom(action => this.store.select('tasks')),
        mergeMap(([action]) => {
          const body: ITask = {text, done: false};
          this.apiService.addTask(body)}
      ),
    { dispatch: false }
  );
  deleteTaskSuccess$ = createEffect(() => this.actions$.pipe(
      ofType(remove),
      concatLatestFrom(action => this.store.select('tasks')),
      tap(([action, tasks]) => {
        window.alert('task removed');
      })
    ),
    { dispatch: false }
  );
  constructor(
    private apiService: ApiService,
    private actions$: Actions,
    private store: Store<{tasks: ITasksState}>
  ) {}
}
