import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterPropertyComponent } from './components/register-property/register-property.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuardService } from './resources/services/auth-guard.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LogInComponent },
  { path: 'register', canActivate: [AuthGuardService], component: RegisterComponent },
  { path: 'register-user', canActivate: [AuthGuardService], component: RegisterUserComponent },
  { path: 'register-property', canActivate: [AuthGuardService], component: RegisterPropertyComponent },
  {
    path: 'dashboard',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./components/dashboard/dashboard.module')
      .then((m) => m.DashboardModule),
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
