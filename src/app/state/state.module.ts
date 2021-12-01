import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducers } from './state.model';
import { EffectsModule } from '@ngrx/effects';
import { TasksEffects } from './tasks/tasks.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  imports: [
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([TasksEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
  ],
})
export class StateModule { }
