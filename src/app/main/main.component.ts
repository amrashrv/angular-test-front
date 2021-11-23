import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import {select, Store} from "@ngrx/store";
import {add, filterTasks, set, updateAll} from "../state/tasks/tasks.actions";
import {ApiService} from "../api/api.service";
import {selectCompletedTasksCounter, selectTasks} from "../state/tasks/tasks.selectors";
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
  count = 0;
  tasks$: Observable<ITask[]> = this.store.pipe(select(selectTasks));
  constructor(
    public testService: TaskService,
    public apiService: ApiService,
    private store: Store<{tasks: ITasksState}>) {
  }
  ngOnInit(): void {
    this.apiService.getTasks().subscribe(( tasks: ITask[]) => {
      this.store.dispatch(set({tasks}));
      this.setCount();
    });
    this.store.select(selectTasks).subscribe(tasks => this.tasks = tasks);
  }
  setCount(){
    this.store.select(selectCompletedTasksCounter).subscribe(result => this.count = result);
  }
  doneAll() {
    this.apiService.doneAll(this.tasks).subscribe((result => this.store.dispatch(updateAll())));
  }
  showAll() {
    this.testService.getTasks();
  }
  filter(value: boolean) {
    this.store.dispatch(filterTasks({value}));
  }
  add(text: string){
    const body: ITask = {text, done: false};
    this.apiService.addTask(body).subscribe((task: ITask) => this.store.dispatch(add({ task })));
  }
}
