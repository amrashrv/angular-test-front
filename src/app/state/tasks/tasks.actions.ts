import { createAction, props } from '@ngrx/store';
import { ITask } from '../../interfaces/task';

export const addTask = createAction('[TODO] add task', props<{text: string}>());
export const addTaskSuccess = createAction('[TODO] Add', props<{ task: ITask }>());
export const removeTaskSuccess = createAction('[TODO] Remove task success', props<{task: ITask }>());
export const removeTask = createAction('[TODO] Remove Task', props<{task: ITask}>())
export const loadTasks = createAction('[TODO] Load tasks');
export const loadTasksSuccess = createAction('[TODO] Load tasks successfully', props<{ tasks: ITask[] }>());
export const update = createAction('[TODO] Update task', props<{item: ITask, value: any, valuetype: any }>());
export const updateSuccess = createAction('[TODO] Update task success', props<{task: ITask}>());
export const updateAll = createAction('[TODO] updateAll');
export const updateAllSuccess = createAction('[TODO] update all success');

