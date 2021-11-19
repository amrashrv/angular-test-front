import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})

export class MainComponent implements OnInit {

  constructor(public testService: TaskService) {
  }

  ngOnInit(): void {
    this.testService.getTasks();
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
}
