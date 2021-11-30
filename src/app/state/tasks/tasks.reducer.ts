import { createReducer, on, State} from '@ngrx/store';
import * as TasksActions from './tasks.actions';
import { adapter, initialTaskState, ITasksState } from './tasks.model';
import { ITask } from '../../interfaces/task';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const taskReducerKey = 'tasks';

export interface TestState extends EntityState<ITask>{
  selectedTaskId: string | number;
}

export const tasksReducer = createReducer(
  initialTaskState,
  on(TasksActions.addTaskSuccess, (state, { task }) => {
    return adapter.setOne(task, state);
  }),
  on(TasksActions.loadTasksSuccess, (state, { tasks }): ITasksState => {
    return adapter.setAll(tasks, state);
  }),
  on(TasksActions.updateSuccess, (state, { task }) => {
    return adapter.updateOne({ id: task._id, changes: { done: task.done, text: task.text } }, state);
  }),
  on(TasksActions.removeTaskSuccess, (state, { task }) => {
    return adapter.removeOne(task._id, state);
  }),
  on(TasksActions.updateAllSuccess, (state, { tasks }) => {
    return adapter.upsertMany(tasks, state);
  }),
  on(TasksActions.clearAllCompletedSuccess, (state, {action}) => {
    console.log(action);
    return adapter.removeMany(action, state);
  })
);

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectAllTasks = selectAll;
