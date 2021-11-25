import {taskReducerKey, tasksReducer} from "./tasks/tasks.reducer";
import {ITasksState} from "./tasks/tasks.model";
import {ActionReducerMap} from "@ngrx/store";
import {appStateKey, appStateReducer} from "./appState/appState.reducer";
import {IAppState} from "./appState/appState.model";

export interface IState {
  [taskReducerKey]: ITasksState;
  [appStateKey]: IAppState;
}

export const reducers: ActionReducerMap<IState> = {
  tasks: tasksReducer,
  appState: appStateReducer
};
