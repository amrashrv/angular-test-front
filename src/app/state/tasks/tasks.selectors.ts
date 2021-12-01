import { createSelector } from '@ngrx/store';
import { IState } from '../state.model';
import { taskReducerKey } from './tasks.reducer';
import { FilterType } from '../../main/main.component';
import * as fromTasks from './tasks.reducer';
import { ITask } from '../../interfaces/task';

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

export const getAllTasks = (type: FilterType) => {
  switch (type) {
    case FilterType.active:
      return selectActiveTasks;

    case FilterType.completed:
      return selectCompletedTasks;
  }
  return selectAllTasks;
};









