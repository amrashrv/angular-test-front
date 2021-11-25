import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {addTask, loadTasks, updateAll} from '../state/tasks/tasks.actions';
import {ApiService} from '../api/api.service';
import {getAllTasks, selectCompletedTasksCounter} from '../state/tasks/tasks.selectors';
import {Observable, Subscription} from 'rxjs';
import {IState} from '../state/state.model';
import {ToastService} from "angular-toastify";
import {TaskService} from "../services/task.service";
import {appStateKey} from "../state/appState/appState.reducer";

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
    private store: Store<IState>,
    private _toastService: ToastService,
    public taskService: TaskService) {
    this.store.subscribe((state) => this.loading = state[appStateKey]);
  }

  filterType = FilterType;
  tasks$ = this.store.select(getAllTasks(FilterType.all));
  count = this.store.select(selectCompletedTasksCounter);
  loading: any;


  private subscriptions: Subscription[] = [];

  ngOnInit() {
    try {
      this.store.dispatch(loadTasks());
    } catch (e){
      this.taskService.errorHandler('no connection');
    }
  }

  doneAll() {
    this.store.dispatch(updateAll());
  }

  add(text: string){
    if (!text) {
      this.taskService.errorHandler('should not be empty');
    } else {
      this.store.dispatch(addTask({text}));
    }
  }

  filter(type: FilterType) {
    this.tasks$ = this.store.select(getAllTasks(type));
  }
}
