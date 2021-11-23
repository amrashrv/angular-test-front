import { createReducer, on } from '@ngrx/store';
import * as TasksActions from './tasks.actions';
import {initialTaskState, ITasksState} from './tasks.model';

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
    return {
      ...state, 
      tasks: state.tasks
      .map((item: any) => item._id === task._id ? {...item, done: task.done , text: task.text} : { ...item } )}
    }),
  on(TasksActions.removeTaskSuccess, (state, {task}) => ({...state, tasks: state.tasks
      .filter(item => item._id !== task._id)})),
  on(TasksActions.updateAllSuccess, (state) => ({...state, tasks: state.tasks
      .map(item => ({...item, done: true}))}))
);

