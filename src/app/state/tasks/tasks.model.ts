import { ITask } from '../../interfaces/task';

export interface ITasksState {
  tasks: ITask[];
}
export const initialTaskState: ITasksState = {
  tasks: []
};
