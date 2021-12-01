import { ITask } from '../../interfaces/task';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface ITasksState extends EntityState<ITask>{
  selectedTaskId: string | null;
}
export const adapter: EntityAdapter<ITask> = createEntityAdapter<ITask>({
  selectId: selectTaskId,
});
export function selectTaskId(a: ITask): string {
  return a._id;
}
export const initialTaskState: ITasksState = adapter.getInitialState({
  selectedTaskId: null
});


