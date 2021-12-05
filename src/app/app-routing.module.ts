import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { RegisterComponent } from './authorization/register/register.component';
import { LoginComponent } from './authorization/login/login.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path: 'main', component: MainComponent, canActivate: [AuthGuard]},
  {path: 'auth', component: AuthorizationComponent, children: [
      {path: 'registration', component: RegisterComponent},
      {path: 'login', component: LoginComponent}
    ]},
  {path: '**', redirectTo: 'auth/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
