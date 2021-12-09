import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TasksService } from '../api/tasks.service';
import { MainComponent } from './main.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { EffectsModule } from '@ngrx/effects';
import { TasksEffects } from '../state/tasks/tasks.effects';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TaskValidationService } from '../services/task-validation.service';
import {MatButtonModule} from "@angular/material/button";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [
    MainComponent,
    TodoItemComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    LayoutModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot([TasksEffects]),
    MatProgressBarModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatRippleModule
  ],
  providers: [
    TasksService,
    TaskValidationService
  ],
  exports: [MainComponent]
})
export class MainModule { }
