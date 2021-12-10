import { createReducer, on } from '@ngrx/store';
import { EntityState } from '@ngrx/entity';

import * as TasksActions from './tasks.actions';
import { adapter, initialTaskState, ITasksState } from './tasks.model';
import { ITask } from '../../interfaces/task';

export const taskReducerKey = 'tasks';

export interface TestState extends EntityState<ITask> {
  selectedTaskId: string | number;
}

export const tasksReducer = createReducer(
  initialTaskState,
  on(TasksActions.addTaskSuccess, (state, {task}): ITasksState => {
    return adapter.setOne(task, state);
  }),
  on(TasksActions.loadTasksSuccess, (state, {tasks}): ITasksState => {
    return adapter.setAll(tasks, state);
  }),
  on(TasksActions.updateSuccess, (state, {task}): ITasksState => {
    return adapter.updateOne({id: task._id, changes: {done: task.done, text: task.text}}, state);
  }),
  on(TasksActions.removeTaskSuccess, (state, {task}): ITasksState => {
    return adapter.removeOne(task._id, state);
  }),
  on(TasksActions.updateAllSuccess, (state, {tasks}): ITasksState => {
    return adapter.upsertMany(tasks, state);
  }),
  on(TasksActions.clearAllCompletedSuccess, (state, {ids}): ITasksState => {
    return adapter.removeMany(ids, state);
  })
);

const {selectAll} = adapter.getSelectors();

export const selectAllTasks = selectAll;
