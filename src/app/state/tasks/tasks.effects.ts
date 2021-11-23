import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../api/api.service';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import { addTask, addTaskSuccess, loadTasks, loadTasksSuccess, removeTask, removeTaskSuccess, update, updateAll, updateAllSuccess, updateSuccess} from './tasks.actions';
import { Store } from '@ngrx/store';
import { ITasksState } from './tasks.model';
import { ITask } from 'src/app/interfaces/task';
import { EditTaskType } from 'src/app/services/task.service';

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
        tap(([action, tasks]) => {
          if(action.text){
            const body = {text: action.text , done: false}
            this.apiService.addTask(body)
            .subscribe((task: ITask) => this.store.dispatch(addTaskSuccess({task})));
            console.log('task added')
          } else {
            alert('task should not be empty')
          }
        })
      ),
    { dispatch: false }
  );

  update$ = createEffect(() => this.actions$.pipe(
    ofType(update),
    concatLatestFrom((action) => this.store.select('tasks')),
    tap(([action, tasks]) => {
      console.log(action)
      let task: ITask;
      let valueKey: string;
      let value = action.value
      if (action.valuetype === EditTaskType.editText){
       valueKey = 'text';
      } else {
        value = action.value.target.checked;
        valueKey = 'done';
      }
      task = { ...action.item, [valueKey]: value};
      this.apiService.editTask(task).subscribe(() => this.store.dispatch(updateSuccess({ task })));
    })
  ), {dispatch: false})

  updateAll$ = createEffect(() => this.actions$.pipe(
    ofType(updateAll),
    concatLatestFrom((action) => this.store.select('tasks')),
    tap(([action, tasks]) => {
      const body: ITask[] = []
      this.apiService.doneAll(body).subscribe(result => this.store.dispatch(updateAllSuccess()));
    })
  ), {dispatch: false})

  deleteTask$ = createEffect(() => this.actions$.pipe(
      ofType(removeTask),
      concatLatestFrom(action => this.store.select('tasks')),
      tap(([action, tasks]) => {
        console.log(action);
        const task = action.task
        this.apiService.deleteTask(action.task).subscribe( result => this.store.dispatch(removeTaskSuccess({task})))
      })
  ), {dispatch: false})
  constructor(
    private apiService: ApiService,
    private actions$: Actions,
    private store: Store<{tasks: ITasksState}>
  ) {}
}
