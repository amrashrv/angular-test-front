import {Component, EventEmitter, Injectable, Input, OnInit, Output} from '@angular/core';
import {Task, TaskService} from "../../services/task.service";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  providers: [TaskService],
})

export class TodoItemComponent implements OnInit {
  @Input('item') item : any;
  @Input('todos') todos: any;
  @Output() newArrayEvent = new EventEmitter<any>();
  selectedTask?: Task;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {

  }
  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe((result) => {
      this.todos = result
      this.newArrayEvent.emit(result)
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
  activateEditMode(value: any){

    console.log(value)
  }
}
