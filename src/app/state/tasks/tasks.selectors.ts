import { ActionReducerMap, createSelector } from '@ngrx/store';
import { adapter, ITasksState } from './tasks.model';
import { IState } from '../state.model';
import { taskReducerKey } from './tasks.reducer';
import { FilterType } from '../../main/main.component';
import * as fromTasks from './tasks.reducer';
import {ITask} from "../../interfaces/task";

export const tasksStateSelector = (state: IState) => state[taskReducerKey];

// const selectAllTasks = createSelector(
//   tasksStateSelector,
//   (state: ITasksState) => state.tasks
// );
export const selectAllTasks = createSelector(
  tasksStateSelector,
  fromTasks.selectAllTasks
);

// export const selectCompletedTasksCounter = createSelector(
//   fromTasks.selectAllTasks,
//   (tasks: ITask[]) => tasks.filter(task => !task.done).length
// );

const selectCompletedTasks = createSelector(
  fromTasks.selectAllTasks,
  (tasks: ITask[]) => tasks.filter(task => task.done)
);

const selectActiveTasks = createSelector(
  fromTasks.selectAllTasks,
  (tasks: ITask[]) => tasks.filter(task => !task.done)
);

export const getAllTasks = (type: FilterType) => {
  switch (type) {
    case FilterType.active:
      return selectActiveTasks;

    case FilterType.completed:
      return selectCompletedTasks;
  }
  return selectAllTasks;
};









