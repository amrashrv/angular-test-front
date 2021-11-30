import { taskReducerKey, tasksReducer } from './tasks/tasks.reducer';
import { ITasksState } from './tasks/tasks.model';
import { ActionReducerMap } from '@ngrx/store';
import { appStateKey, appReducer } from './app/app.reducer';
import { IAppState } from './app/app.model';

export interface IState {
  [taskReducerKey]: ITasksState;
  [appStateKey]: IAppState;
}

export const reducers: ActionReducerMap<IState> = {
  tasks: tasksReducer,
  appState: appReducer
};
