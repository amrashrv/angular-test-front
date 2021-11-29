import { createAction, props } from '@ngrx/store';
import { ITask } from '../../interfaces/task';

export const addTask = createAction('[TODO] Add task', props<{text: string}>());
export const removeTask = createAction('[TODO] Remove task', props<{task: ITask}>());
export const loadTasks = createAction('[TODO] Load tasks');
export const updateTaskText = createAction('[TODO] Update task text', props<{task: ITask; text: string}>());
export const updateIsTaskCompleted = createAction('[TODO] Update is task completed', props<{task: ITask; done: boolean}>());
export const updateAll = createAction('[TODO] Update all', props<{done: boolean}>());

export const addTaskSuccess = createAction('[TODO] Add task successfully', props<{ task: ITask }>());
export const removeTaskSuccess = createAction('[TODO] Remove task successfully', props<{task: ITask }>());
export const loadTasksSuccess = createAction('[TODO] Load tasks successfully', props<{ tasks: ITask[] }>());
export const updateSuccess = createAction('[TODO] Update task successfully', props<{task: ITask}>());
export const updateAllSuccess = createAction('[TODO] Update all successfully', props<{ done: boolean }>());

