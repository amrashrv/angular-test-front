import { createReducer, on } from '@ngrx/store';
import { initialAppState } from './appState.model';
import * as TasksActions from '../tasks/tasks.actions';
import { setErrorState } from './appState.actions';

export const appStateKey = 'appState';

export const appStateReducer = createReducer(
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
