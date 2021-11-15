import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TodosComponent} from "./todos/todos.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

const routes: Routes = [
  {path: 'todos', component: TodosComponent},
  {path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
