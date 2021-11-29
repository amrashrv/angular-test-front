import { createAction, props } from '@ngrx/store';
import { ITask } from '../../interfaces/task';

export const addTask = createAction('[TODO] Task added', props<{text: string}>());
export const removeTask = createAction('[TODO] Task removed', props<{task: ITask}>());
export const loadTasks = createAction('[TODO] Tasks loaded');
export const updateTaskText = createAction('[TODO] Task text updated', props<{task: ITask; text: string}>());
export const updateIsTaskCompleted = createAction('[TODO] Task is completed', props<{task: ITask; done: boolean}>());
export const updateAll = createAction('[TODO] All tasks updated', props<{done: boolean}>());
export const clearAllCompleted = createAction('[TODO] Done tasks cleared');

export const addTaskSuccess = createAction('[TODO] Task added successfully', props<{ task: ITask }>());
export const removeTaskSuccess = createAction('[TODO] Task removed successfully', props<{task: ITask }>());
export const loadTasksSuccess = createAction('[TODO] Tasks loaded successfully', props<{ tasks: ITask[] }>());
export const updateSuccess = createAction('[TODO] Task updated successfully', props<{task: ITask}>());
export const updateAllSuccess = createAction('[TODO] All tasks updated successfully', props<{ done: boolean }>());
export const clearAllCompletedSuccess = createAction('[TODO] Done tasks cleared successfully');

