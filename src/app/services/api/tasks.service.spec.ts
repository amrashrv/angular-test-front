import { TasksService } from './tasks.service';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ITask } from '../../interfaces/task';
import { HttpClient } from '@angular/common/http';
import { addTask } from '../../state/tasks/tasks.actions';
import { of } from 'rxjs';

const testUrl = 'http://localhost:5000/api';
let testTasksArray: ITask[] | undefined;
let resTasks: ITask[];
let resTask: ITask;
let testTask: ITask| undefined;

const mockTask: ITask = {
  _id: '123123',
  text: '123123',
  done: false,
  userId: '123123'
};
const mockTasks: ITask[] = [
  {
    _id: '123123',
    text: '123123',
    done: false,
    userId: '123123'
  },
  {
    _id: '123123',
    text: '123123',
    done: false,
    userId: '123123'
  },
  {
    _id: '123123',
    text: '123123',
    done: false,
    userId: '123123'
  }
];

describe('TasksService', () => {
  let tasksService: TasksService;
  let controller: HttpTestingController;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  const serviceSpy = jasmine.createSpyObj('TasksService', ['getTasks',
    'deleteTask',
    'addTask',
    'updateTaskText',
    'updateTaskIsCompleted']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TasksService, {provide: TasksService, useValue: serviceSpy}],
      imports: [HttpClientTestingModule, RouterTestingModule]
      });
    tasksService = TestBed.inject(TasksService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('tasks service should be defined', () => {
    expect(tasksService).toBeDefined();
  });

  it('should get tasks', fakeAsync (() => {
    serviceSpy.getTasks.and.returnValue(of(mockTasks));
    tasksService.getTasks().subscribe((tasks) => {
      expect(mockTasks).toEqual(tasks);
    });
  }));

  it('should delete task', fakeAsync(() => {
    serviceSpy.deleteTask.and.returnValue(of(mockTasks));
    tasksService.deleteTask(mockTask).subscribe((tasks) => {
      expect(mockTasks).toEqual(tasks);
    });
  }));

  it('should add task', fakeAsync(() => {
    const text = 'test test';
    serviceSpy.addTask.and.returnValue(of(mockTask));
    tasksService.addTask(text).subscribe((res) => {
      expect(mockTask).toEqual(res);
    });
  }));

  it('should update task text', fakeAsync(() => {
    const mockAction = { text: 'ahsdkfhjas', task: mockTask};
    serviceSpy.updateTaskText.and.returnValue(of({...mockTask, text: 'ahsdkfhjas'}));
    tasksService.updateTaskText(mockAction).subscribe((res) => {
      expect({...mockTask, text: 'ahsdkfhjas'}).toEqual(res);
    });
  }));

  it('should update task is done', fakeAsync (() => {
    const mockAction = { done: true, task: mockTask};
    serviceSpy.updateTaskIsCompleted.and.returnValue(of(mockTask));
    tasksService.updateTaskIsCompleted(mockAction).subscribe((res) => {
      expect({...mockTask, done: false}).toEqual(res);
    });
  }));
});
