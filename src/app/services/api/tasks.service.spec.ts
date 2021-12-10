import { of } from 'rxjs';
import { TasksService } from './tasks.service';
import { ITask } from '../../interfaces/task';
import { HttpClient } from '@angular/common/http';


const mockTask: ITask = {
  _id: '1',
  text: 'test',
  done: false,
  userId: '1'
};
const mockTasks: ITask[] = [
  {
    _id: '1',
    text: 'test',
    done: false,
    userId: '1'
  },
  {
    _id: '2',
    text: 'test2',
    done: false,
    userId: '2'
  },
  {
    _id: '3',
    text: 'test3',
    done: true,
    userId: '3'
  }
];

describe('TasksService', () => {

  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let tasksService: TasksService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'delete', 'patch']);
    tasksService = new TasksService(httpClientSpy);
  });

  it('should return expected tasks ', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(mockTasks));
    tasksService.getTasks().subscribe(
      tasks => {
        expect(tasks).toEqual(mockTasks, 'expected tasks');
        done();
      },
      done.fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should post expected task ', (done: DoneFn) => {
    const str = 'test text';
    httpClientSpy.post.and.returnValue(of(mockTask));
    tasksService.addTask(str).subscribe(
      task => {
        expect(task).toEqual(mockTask, 'expected task');
        done();
      },
      done.fail
    );
    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  });

  it('should delete expected task ', (done: DoneFn) => {
    httpClientSpy.delete.and.returnValue(of(mockTasks));
    tasksService.deleteTask(mockTask).subscribe(
      tasks => {
        expect(tasks).toEqual(mockTasks, 'expected task');
        done();
      },
      done.fail
    );
    expect(httpClientSpy.delete.calls.count()).toBe(1, 'one call');
  });

  it('should update expected task text ', (done: DoneFn) => {
    httpClientSpy.patch.and.returnValue(of(mockTask));
    tasksService.updateTaskText(mockTask, 'test').subscribe(
      tasks => {
        expect(tasks).toEqual(mockTask, 'expected task');
        done();
      },
      done.fail
    );
    expect(httpClientSpy.patch.calls.count()).toBe(1, 'one call');
  });

  it('should update expected task is completed ', (done: DoneFn) => {
    httpClientSpy.patch.and.returnValue(of(mockTask));
    tasksService.updateTaskIsCompleted(mockTask, false).subscribe(
      tasks => {
        expect(tasks).toEqual(mockTask, 'expected task');
        done();
      },
      done.fail
    );
    expect(httpClientSpy.patch.calls.count()).toBe(1, 'one call');
  });
});
