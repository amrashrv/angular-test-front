import {Component} from '@angular/core';
import {ApiService} from "./services/api.service";
import {TaskService} from "./services/task.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ApiService, TaskService]
})
export class AppComponent {
  title = 'todo-list';

}
