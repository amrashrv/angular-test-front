import { createAction, props } from '@ngrx/store';
import { ITask } from '../../interfaces/task';


export const add = createAction('[TODO] Add', props<{ task: ITask }>());
export const remove = createAction('[TODO] Remove', props<{task: ITask }>());
export const loadTasks = createAction('[TODO] Load tasks');
export const loadTasksSuccess = createAction('[TODO] Load tasks successfully', props<{ tasks: ITask[] }>());
export const update = createAction('[TODO] Update', props<{task: ITask }>());
export const updateAll = createAction('[TODO] updateAll');

