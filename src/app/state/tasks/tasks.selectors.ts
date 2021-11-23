import {createSelector} from '@ngrx/store';
import {ITasksState } from "./tasks.model";
import {IState} from "../state.model";
import {taskReducerKey} from "./tasks.reducer";


export const tasksStateSelector = (state: IState) => state[taskReducerKey];

export const selectTasks = createSelector(
  tasksStateSelector,
  (state: ITasksState) => state.tasks
);

export const selectCompletedTasksCounter = createSelector(
  tasksStateSelector,
  (state: ITasksState) => state.tasks.filter(task => !task.done).length
);
