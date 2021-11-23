import { Component, Input } from '@angular/core';
import { EditTaskType, TaskService } from '../../services/task.service';
import { ITask } from '../../interfaces/task';
import { Store } from '@ngrx/store';
import { ApiService } from '../../api/api.service';
import { removeTask, update } from '../../state/tasks/tasks.actions';

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
    public apiService: ApiService,
    private store: Store) {}

  deleteTask(task: ITask): void {
    this.store.dispatch(removeTask({task}));
  }
  editTask(item: ITask, value: any, valuetype: EditTaskType){
    this.store.dispatch(update({item, value, valuetype}));
  }
  onSelect(item: ITask) {
    this.selectedItem = '';
    this.selectedItem = item;
  }
}
