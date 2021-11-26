import {createSelector} from '@ngrx/store';
import {ITasksState} from './tasks.model';
import {IState} from '../state.model';
import {taskReducerKey} from './tasks.reducer';
import {FilterType} from "../../main/main.component";


export const tasksStateSelector = (state: IState) => state[taskReducerKey];

const selectAllTasks = createSelector(
  tasksStateSelector,
  (state: ITasksState) => state.tasks
);

export const selectCompletedTasksCounter = createSelector(
  tasksStateSelector,
  (state: ITasksState) => state.tasks.filter(task => !task.done).length
);

const selectCompletedTasks = createSelector(
  tasksStateSelector,
  (state: ITasksState) => state.tasks.filter(task => task.done)
);

const selectActiveTasks = createSelector(
  tasksStateSelector,
  (state: ITasksState) => state.tasks.filter(task => !task.done)
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

