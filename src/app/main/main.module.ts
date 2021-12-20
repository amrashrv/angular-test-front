import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRippleModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { TasksService } from '../services/api/tasks-service/tasks.service';
import { MainComponent } from './main.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TasksEffects } from '../state/tasks/tasks.effects';
import { TaskValidationService } from '../services/api/tasks-service/task-validation.service';
import { MatTooltipModule } from '@angular/material/tooltip';

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
    MatRippleModule,
    MatTooltipModule,
  ],
  providers: [
    TasksService,
    TaskValidationService,
  ],
  exports: [MainComponent]
})
export class MainModule {
}
