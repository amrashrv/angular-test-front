import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { addTask, loadTasks, updateAll } from '../state/tasks/tasks.actions';
import { ApiService } from '../api/api.service';
import { getAllTasks, selectCompletedTasksCounter} from '../state/tasks/tasks.selectors';
import { ITask } from '../interfaces/task';
import { Subscription } from 'rxjs';
import { IState } from '../state/state.model';

export enum FilterType {
  all,
  active,
  completed
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(
    public apiService: ApiService,
    private store: Store<IState>) {
  }

  filterType = FilterType;
  tasks$ = this.store.select(getAllTasks(FilterType.all));
  count = this.store.select(selectCompletedTasksCounter);

  private subscriptions: Subscription[] = [];

  ngOnInit() {
    this.store.dispatch(loadTasks());
  }

  doneAll() {
    this.store.dispatch(updateAll());
  }

  add(text: string){
    this.store.dispatch(addTask({text}));
  }

  filter(type: FilterType) {
    this.tasks$ = this.store.select(getAllTasks(type));
  }
}
