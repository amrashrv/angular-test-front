import {taskReducerKey, tasksReducer} from "./tasks/tasks.reducer";
import {ITasksState} from "./tasks/tasks.model";
import {ActionReducerMap} from "@ngrx/store";

export interface IState {
  [taskReducerKey]: ITasksState;
}

export const reducers: ActionReducerMap<IState> = {
  tasks: tasksReducer
};
