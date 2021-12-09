import { TasksService } from './tasks.service';
import { ITask } from '../../interfaces/task';
import { HttpClient } from '@angular/common/http';

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

  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let tasksService: TasksService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'delete', 'patch']);
    tasksService = new TasksService(httpClientSpy);
  });

  it('should return expected tasks (HttpClient called once)', (done: DoneFn) => {
    const expectedTasks: ITask[] = mockTasks;

    httpClientSpy.get.and.returnValue(of(expectedTasks));

    tasksService.getTasks().subscribe(
      tasks => {
        expect(tasks).toEqual(expectedTasks, 'expected tasks');
        done();
      },
      done.fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should post expected task (HttpClient called once)', (done: DoneFn) => {
    const expectedTask: ITask = mockTask;

    const str = 'test text';

    httpClientSpy.post.and.returnValue(of(expectedTask));

    tasksService.addTask(str).subscribe(
      task => {
        expect(task).toEqual(expectedTask, 'expected task');
        done();
      },
      done.fail
    );
    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  });

  it('should delete expected task (HttpClient called once)', (done: DoneFn) => {
    const expectedTask: ITask = mockTask;
    const expectedTasks: ITask[] = mockTasks;

    httpClientSpy.delete.and.returnValue(of(expectedTasks));

    tasksService.deleteTask(expectedTask).subscribe(
      tasks => {
        expect(tasks).toEqual(expectedTasks, 'expected task');
        done();
      },
      done.fail
    );
    expect(httpClientSpy.delete.calls.count()).toBe(1, 'one call');
  });

  it('should update expected task (HttpClient called once)', (done: DoneFn) => {
    const expectedTask: ITask = mockTask;
    const expectedTasks: ITask[] = mockTasks;

    httpClientSpy.patch.and.returnValue(of(expectedTask));

    tasksService.updateTaskText(expectedTask, 'test').subscribe(
      tasks => {
        expect(tasks).toEqual(expectedTask, 'expected task');
        done();
      },
      done.fail
    );
    expect(httpClientSpy.patch.calls.count()).toBe(1, 'one call');
  });
//   let controller: HttpTestingController;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [TasksService],
//       imports: [HttpClientTestingModule, RouterTestingModule]
//       });
//     // tasksService = TestBed.inject(TasksService);
//     controller = TestBed.inject(HttpTestingController);
//   });

  // it('tasks service should be defined', () => {
  //   expect(tasksService).toBeDefined();
  // });
  //
  // it('should get tasks', fakeAsync (() => {
  //   return tasksService.getTasks().subscribe((tasks) => {
  //     expect(mockTasks).toEqual(tasks);
  //   });
  // }));
  //
  // it('should delete task', fakeAsync(() => {
  //   return tasksService.deleteTask(mockTask).subscribe((tasks) => {
  //     expect(mockTasks).toEqual(tasks);
  //   });
  // }));
  //
  // it('should add task', fakeAsync(() => {
  //   const text = 'test test';
  //   tasksService.addTask(text).subscribe((res) => {
  //     expect(mockTask).toEqual(res);
  //   });
  // }));
  //
  // it('should update task text', fakeAsync(() => {
  //   tasksService.updateTaskText(mockTask, 'text').subscribe((res) => {
  //     expect({...mockTask, text: 'ahsdkfhjas'}).toEqual(res);
  //   });
  // }));
  //
  // it('should update task is done', (done) => {
  //   tasksService.updateTaskIsCompleted(mockTask, true).subscribe((res) => {
  //     expect({...mockTask, done: false}).toEqual(res);
  //     done();
  //   });
  // });

});
