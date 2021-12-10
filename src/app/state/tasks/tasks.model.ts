import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { ITask } from '../../interfaces/task';

export interface ITasksState extends EntityState<ITask> {
  selectedTaskId: string | null;
}

export const adapter: EntityAdapter<ITask> = createEntityAdapter<ITask>({
  selectId: selectTaskId,
});

export function selectTaskId(task: ITask): string {
  return task._id;
}

export const initialTaskState: ITasksState = adapter.getInitialState({
  selectedTaskId: null
});


