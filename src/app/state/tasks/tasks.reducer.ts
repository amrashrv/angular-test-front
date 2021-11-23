import { createReducer, on } from '@ngrx/store';
import * as TasksActions from './tasks.actions';
import { initialTaskState } from './tasks.model';

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
  on(TasksActions.set, (state, { tasks }) => ({...state, tasks })),
  on(TasksActions.update, (state, { task }) => ({...state, tasks: state.tasks
      .map((item: any) => item._id === task._id ? {...item, done: task.done , text: task.text} : { ...item } )})),
  on(TasksActions.remove, (state, {task}) => ({...state, tasks: state.tasks
      .filter(item => item._id !== task._id)})),
  on(TasksActions.updateAll, (state) => ({...state, tasks: state.tasks
      .map(item => ({...item, done: true}))})),
  on(TasksActions.filterTasks, (state, {value}) => ({...state, tasks: state.tasks
      .filter(item => item.done === value)}))
);

