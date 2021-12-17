import { createSelector } from '@ngrx/store';

import { IState } from '../state.model';
import { taskReducerKey } from './tasks.reducer';
import * as fromTasks from './tasks.reducer';
import { ITask } from '../../interfaces/task';
import { TASKS_FILTER } from '../../consts/consts';

export const tasksStateSelector = (state: IState) => state[taskReducerKey];

export const selectAllTasks = createSelector(
  tasksStateSelector,
  fromTasks.selectAllTasks
);

export const selectCompletedTasksCounter = createSelector(
  selectAllTasks,
  (tasks: ITask[]) => tasks.filter(task => !task.done).length
);

export const selectCompletedTasks = createSelector(
  selectAllTasks,
  (tasks: ITask[]) => tasks.filter(task => task.done)
);

const selectActiveTasks = createSelector(
  selectAllTasks,
  (tasks: ITask[]) => tasks.filter(task => !task.done)
);

export const getAllTasks = (type: TASKS_FILTER) => {
  switch (type) {
    case TASKS_FILTER.active:
      return selectActiveTasks;

    case TASKS_FILTER.completed:
      return selectCompletedTasks;
  }
  return selectAllTasks;
};









