import { TasksService } from './tasks.service';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ITask } from '../../interfaces/task';
import { HttpClient } from '@angular/common/http';
import { addTask } from '../../state/tasks/tasks.actions';
import { of } from 'rxjs';

const testUrl = 'http://localhost:5000/api';


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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TasksService],
      imports: [HttpClientTestingModule, RouterTestingModule]
      });
    tasksService = TestBed.inject(TasksService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('tasks service should be defined', () => {
    expect(tasksService).toBeDefined();
  });

  it('should get tasks', fakeAsync (() => {
    return tasksService.getTasks().subscribe((tasks) => {
      expect(mockTasks).toEqual(tasks);
    });
  }));

  it('should delete task', fakeAsync(() => {
    return tasksService.deleteTask(mockTask).subscribe((tasks) => {
      expect(mockTasks).toEqual(tasks);
    });
  }));

  it('should add task', fakeAsync(() => {
    const text = 'test test';
    tasksService.addTask(text).subscribe((res) => {
      expect(mockTask).toEqual(res);
    });
  }));

  it('should update task text', fakeAsync(() => {
    tasksService.updateTaskText(mockTask, 'text').subscribe((res) => {
      expect({...mockTask, text: 'ahsdkfhjas'}).toEqual(res);
    });
  }));

  it('should update task is done', fakeAsync (() => {
    tasksService.updateTaskIsCompleted(mockTask, true).subscribe((res) => {
      expect({...mockTask, done: false}).toEqual(res);
    });
  }));
});
