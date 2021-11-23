import { createAction, props } from '@ngrx/store';
import { ITask } from '../../interfaces/task';

export const increment = createAction('[Counter Component] Increment');
export const decrement = createAction('[Counter Component] Decrement');
export const reset = createAction('[Counter Component] Reset');

export const add = createAction('[TODO] Add', props<{ task: ITask }>());
export const remove = createAction('[TODO] Remove', props<{task: ITask }>());
export const set = createAction('[TODO] Set', props<{ tasks: ITask[] }>());
export const update = createAction('[TODO] Update', props<{task: ITask }>());


