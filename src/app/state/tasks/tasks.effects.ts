import {Injectable} from "@angular/core";
import {Actions, concatLatestFrom, createEffect, ofType} from "@ngrx/effects";
import {ApiService} from "../../api/api.service";
import {catchError, map, mergeMap, tap} from "rxjs/operators";
import { of } from "rxjs";
import {add, set} from "./tasks.actions";
import {Store} from "@ngrx/store";
import {ITasksState} from "./tasks.model";

@Injectable()
export class TasksEffects {
  loadTasks = createEffect( () => this.actions$.pipe(
    ofType('[TODO] Add'),
    mergeMap(() => this.apiService.getTasks()
      .pipe(
        map(tasks => ({type: '[TODO API] tasks loaded success', payload: tasks})),
        catchError(() => of ({ type: '[Movies API] Movies Loaded Error' }))
      ))
  ));
  addTaskToCollectionsSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(add),
        concatLatestFrom(action => this.store.select("tasks")),
        tap(([action, tasks]) => {
          if (tasks) {
            window.alert('Congrats on adding your first book!');
          } else {
            window.alert('You have added book number ');
          }
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
