import {Component} from '@angular/core';
import {TaskService} from "./services/task.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [TaskService]
})
export class AppComponent {
  title = 'todo-list';

}
