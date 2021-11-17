import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Task, TaskService} from "../../services/task.service";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  providers: [TaskService],
})

export class TodoItemComponent {
  @Input() item : any;
  @Input() todos: any;
  @Output() newArrayEvent = new EventEmitter<any>();

  constructor(private taskService: TaskService) { }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe((result) => {
      this.todos = result
      this.newArrayEvent.emit(result);
    })
  }
  setItemChecked(e: boolean, item: any){
    let task = {}
    this.taskService.checkIsDone({...item, done: e}).subscribe(result => {
      this.todos.map((elem: any) => {
        if( elem._id === item._id){
          item.done = e
          task = item
        }
      })
    })
  }
}
