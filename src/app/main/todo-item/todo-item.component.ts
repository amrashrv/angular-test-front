import { Component, Input } from '@angular/core';
import { EditTaskType, TaskService } from '../../services/task.service';
import { ITask } from '../../interfaces/task';
import {Store} from "@ngrx/store";
import {ITasksState} from "../../state/tasks/tasks.model";
import {ApiService} from "../../api/api.service";
import {remove, update} from "../../state/tasks/tasks.actions";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})

export class TodoItemComponent {
  @Input() item: any;
  selectedItem: any;
  public editType = EditTaskType;
  constructor(
    public testService: TaskService,
    public apiService: ApiService,
    private store: Store<{task: ITasksState}>) {}

  deleteTask(task: ITask): void {
    this.apiService.deleteTask(task).subscribe(() => {
      this.store.dispatch(remove({task}));
    });
  }
  editTask(item: any, value: any, type: EditTaskType){
    let task: ITask;
    let valueKey: string;
    if (type === EditTaskType.editText){
      valueKey = 'text';
    } else {
      value = value.target.checked;
      valueKey = 'done';
    }
    task = { ...item, [valueKey]: value};
    this.apiService.editTask(task).subscribe(() => this.store.dispatch(update({ task })));
  }
  onSelect(item: ITask) {
    this.selectedItem = '';
    this.selectedItem = item;
  }
}
