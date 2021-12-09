import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItemComponent } from './todo-item.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ITask } from 'src/app/interfaces/task';
import { TasksService } from '../../api/tasks.service';

describe('TodosListComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;
  const initialState = { loggedIn: false };
  const serviceSpy = jasmine.createSpyObj('TasksService', ['getTasks']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, MatListModule, MatIconModule, FormsModule, ReactiveFormsModule],
      declarations: [TodoItemComponent],
      providers: [provideMockStore({ initialState }),
        TodoItemComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component = TestBed.inject(TodoItemComponent);
  });

  it('should create Todo-item component', () => {
    expect(component).toBeTruthy();
  });

  it('task should be undone by default', () => {
    expect(component.checked).toEqual(false);
  });

});
