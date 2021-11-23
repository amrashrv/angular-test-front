import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiService } from '../api/api.service';
import { MainComponent } from './main.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import {EffectsModule} from "@ngrx/effects";
import {TasksEffects} from "../state/tasks/tasks.effects";

@NgModule({
  declarations: [
    MainComponent,
    TodoItemComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatTableModule,
    HttpClientModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot([TasksEffects])
  ],
  providers: [
    ApiService,
  ],
  exports: [MainComponent]
})
export class MainModule { }
