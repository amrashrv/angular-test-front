import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ITask } from '../interfaces/task';
import { Observable, of } from 'rxjs';
import { TasksService } from '../api/tasks.service';
import { By } from '@angular/platform-browser';

describe('MainComponent', () => {
  let component: MainComponent;
  let mockTasks: Observable<ITask[]>;
  let fixture: ComponentFixture<MainComponent>;
  const serviceSpy = jasmine.createSpyObj('TasksService', ['getTasks', 'addTask']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainComponent],
      imports: [HttpClientTestingModule,
        RouterTestingModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatButtonToggleModule,
        ReactiveFormsModule],
      providers: [provideMockStore(), MainComponent,
        {provide: TasksService, useValue: serviceSpy}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component = TestBed.inject(MainComponent);
  });

  it('should create Main Component', () => {
    expect(component).toBeTruthy();
  });

  it('should define form input', () => {
    const formElement = fixture.nativeElement.querySelectorAll('input');
    expect(formElement.length).toEqual(1);
  });

  it('check initial values for addTask input', () => {
    const addTaskFrom = component.newTaskFormControl;
    const taskFormValues = '';
    expect(addTaskFrom.value).toEqual(taskFormValues);
  });

  it('check values from formControll and input equality', () => {
    const editTaskInputElement = fixture.nativeElement.querySelector('input');
    const editTaskValueFromControll = component.newTaskFormControl;
    expect(editTaskInputElement.value).toEqual(editTaskValueFromControll.value);
    expect(editTaskValueFromControll.errors).not.toBeNull();
  });

});
