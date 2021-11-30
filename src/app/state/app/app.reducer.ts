import { createReducer, on } from '@ngrx/store';
import { initialAppState } from './app.model';
import * as TasksActions from '../tasks/tasks.actions';
import * as AppActions from './app.actions';

export const appStateKey = 'appState';


export const appReducer = createReducer(
  initialAppState,
  on(TasksActions.loadTasks,
    TasksActions.removeTask,
    TasksActions.addTask,
    TasksActions.updateAll,
    (state) => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(TasksActions.loadTasksSuccess,
    TasksActions.removeTaskSuccess,
    TasksActions.updateSuccess,
    TasksActions.updateAllSuccess,
    TasksActions.addTaskSuccess,
    AppActions.operationFailed,
    (state) => {
    return {
      ...state,
      isLoading: false
    };
  }),
  on(AppActions.operationFailed, (state) => {
    return {
      ...state,
      hasError: true
    };
  })
);
