import { createReducer, on } from '@ngrx/store';
import * as TasksActions from './tasks.actions';
import { initialTaskState, ITasksState } from './tasks.model';
import { ITask } from '../../interfaces/task';

export const taskReducerKey = 'tasks';

export const tasksReducer = createReducer(
  initialTaskState,
  on(TasksActions.addTaskSuccess, (state, { task }) => {
    const newTasks = [...state.tasks];
    newTasks.push(task);
    return {
      ...state,
      tasks: newTasks
    };
  }),
  on(TasksActions.loadTasksSuccess, (state, { tasks }): ITasksState => {
    return {
      ...state,
      tasks
    };
  }),
  on(TasksActions.updateSuccess, (state, { task }) => {
    const updateStatusAndTextById = (item: ITask) => {
      if (item._id === task._id) {
        return {
          ...item,
          done: task.done,
          text: task.text
        };
      }
      return item;
    };
    const newTasks = state.tasks.map(updateStatusAndTextById);
    return {
      ...state,
      tasks: newTasks
    };
  }),
  on(TasksActions.removeTaskSuccess, (state, { task }) => {
    return {
      ...state,
      tasks: state.tasks.filter(item => item._id !== task._id)
    };
  }),
  on(TasksActions.updateAllSuccess, (state, { done }) => {
    return {
      ...state,
      tasks: state.tasks.map(item => ({ ...item, done }))
    };
  })
);

