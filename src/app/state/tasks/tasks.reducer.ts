import { createReducer, on } from '@ngrx/store';
import * as TasksActions from './tasks.actions';
import {initialTaskState} from "./tasks.model";

export const taskReducerKey = 'tasks';

export const tasksReducer = createReducer(
  initialTaskState,
  on(TasksActions.add, (state, { task }) => {
    const newTasks = [...state.tasks];
    newTasks.push(task);
    return {
      ...state,
      tasks: newTasks
    };
  }),
  on(TasksActions.set, (state, { tasks }) => {
    return {
      ...state, tasks
    };
  }),
  on(TasksActions.update, (state, { task }) => {
    const newTasks = [...state.tasks];
    newTasks.forEach(item => {
      if (item._id === task._id){
        item.done = false;
      }
    });
    return {...state, tasks: newTasks};
  }),
  on(TasksActions.remove, (state, {task}) => ({...state, tasks: state.tasks.filter(item => item._id !== task._id)}))
);

