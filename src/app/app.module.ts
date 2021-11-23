import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { MainModule } from './main/main.module';
import { StateModule } from "./state/state.module";
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    MainModule,
    StateModule,
    EffectsModule.forRoot([])
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
