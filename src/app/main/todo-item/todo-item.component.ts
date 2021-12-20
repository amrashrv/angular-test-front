import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

import { ITask } from '../../interfaces/task';
import * as taskActions from '../../state/tasks/tasks.actions';
import { FormControl, Validators } from '@angular/forms';
import { TaskValidationService } from '../../services/task-validation.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})

export class TodoItemComponent implements OnInit {
  @Input() item!: ITask;
  @Input() isLoading$!: Observable<boolean>;

  @ViewChild('taskInput')
  set input(element: ElementRef<HTMLInputElement>) {
    if (element) {
      element.nativeElement.focus();
      if (this.item) {
        this.editTaskFormControl.setValue(this.item.text);
      }
    }
  }

  selectedItem?: ITask;
  checked = false;
  editTaskFormControl = new FormControl('', [Validators.required, Validators.maxLength(60)]);

  constructor(
    private store: Store,
    private taskValidationService: TaskValidationService
  ) {
  }

  ngOnInit(): void {
    if (this.item) {
      this.checked = this.item.done;
      this.editTaskFormControl.setValue(this.item.text);
    }
  }

  deleteTask(task: ITask): void {
    this.store.dispatch(taskActions.removeTask({task}));
  }

  updateTaskText(task: ITask): void {
    const formControl = this.editTaskFormControl;
    if (this.taskValidationService.taskValidation(formControl)) {
      const text = formControl.value;
      this.store.dispatch(taskActions.updateTaskText({task, text}));
    }
  }

  updateTaskStatus(task: ITask, done: boolean): void {
    this.store.dispatch(taskActions.updateTaskStatus({task, done}));
  }

  closeEditMode(): void {
    this.selectedItem = undefined;
  }

  openEditMode(item: ITask): void {
    this.selectedItem = item;
  }
}
