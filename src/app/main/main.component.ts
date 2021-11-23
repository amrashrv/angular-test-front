import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import {select, Store} from "@ngrx/store";
import {add, set} from "../state/tasks/tasks.actions";
import {ApiService} from "../api/api.service";
import { selectTasks } from "../state/tasks/tasks.selectors";
import {ITasksState} from "../state/tasks/tasks.model";
import {ITask} from "../interfaces/task";
import {Observable} from "rxjs";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})

export class MainComponent implements OnInit {
  tasks: any = [];
  tasks$: Observable<ITask[]> = this.store.select(selectTasks);
  constructor(public testService: TaskService, public apiService: ApiService, private store: Store<{tasks: ITasksState}>) {
  }
  ngOnInit(): void {
    this.apiService.getTasks().subscribe(( tasks: ITask[]) => {
      this.store.dispatch(set({tasks}));
    });
    this.store.select(selectTasks).subscribe(tasks => this.tasks = tasks);
  }
  addNewData(task: string){
    this.testService.addNewData(task);
  }
  doneAll() {
    this.testService.doneAll();
  }
  showAll() {
    this.testService.getTasks();
  }
  filter(value: string) {
    this.testService.filter(value);
  }
  setCount(){
    this.testService.setCount();
  }
  add(text: string){
    const body: ITask = {text, done: false};
    this.apiService.addTask(body).subscribe((task: ITask) => this.store.dispatch(add({ task })));
  }
}
