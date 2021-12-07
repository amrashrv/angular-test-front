import { TasksService } from './tasks.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ITask } from '../interfaces/task';
import { HttpClient } from '@angular/common/http';

const testUrl = 'http://localhost:5000/api';
let testTasksArray: ITask[] | undefined;
let resTasks: ITask[];
let resTask: ITask;
let testTask: ITask| undefined;

describe('TasksService', () => {
  let tasksService: TasksService;
  let controller: HttpTestingController;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [TasksService],
      imports: [HttpClientTestingModule, RouterTestingModule]
      });
    tasksService = TestBed.inject(TasksService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('get tasks', () => {
    tasksService.getTasks().subscribe((tasks) => {
      resTasks = tasks;
      const req = controller.expectOne(`${testUrl}/tasks`);
      req.flush(resTasks);
    });
    expect(testTasksArray).toEqual(resTasks);
  });

  it('delete task', () => {
    const mockTask: ITask = {
      _id: '123123',
      text: '123123',
      done: false,
      userId: '123123'
    };
    tasksService.deleteTask(mockTask).subscribe((tasks) => {
      resTasks = tasks;
    });
    expect(testTasksArray).toEqual(resTasks);
  });

  it('add task', () => {
    const text = 'test test';
    tasksService.addTask(text).subscribe((res) => {
      resTask = res;
      const req = controller.expectOne({
        method: 'POST',
        url: `${testUrl}/task`});
      req.flush(resTask);
    });
    expect(testTask).toEqual(resTask);
  });
  it('should be created tasksService', () => {
    expect(tasksService).toBeTruthy();
  });
});
