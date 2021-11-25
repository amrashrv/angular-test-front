import { createReducer, on } from '@ngrx/store';
import { initialAppState } from './app.model';
import * as TasksActions from '../tasks/tasks.actions';
import { setErrorState } from './app.actions';

export const appStateKey = 'appState';

export const appReducer = createReducer(
  initialAppState,
  on(TasksActions.loadTasks,
    TasksActions.removeTask,
    TasksActions.addTask,
    TasksActions.updateAll,
    TasksActions.update,
    ( state ) => {
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
    TasksActions.operationFail,
    (state) => {
    return {
      ...state,
      isLoading: false
    };
  }),
  on(setErrorState, (state, { hasError }) => {
    return {
      ...state,
      hasError
    };
  })
);
