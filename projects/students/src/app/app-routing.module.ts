import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AnalyticsComponent } from './components/dashboard/analytics/analytics.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TestsComponent } from './components/dashboard/tests/tests.component';
import { SubmissionComponent } from './components/submission/submission.component';
import { TestWindowComponent } from './components/test-window/test-window.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: '', component: LoginComponent, pathMatch: 'full' },
      { path: 'signup', component: SignupComponent },
    ],
  },
  {
    path: 'submission',
    component: SubmissionComponent,
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: TestsComponent, pathMatch: 'full' },
      { path: 'analytics', component: AnalyticsComponent },
    ],
  },
  {
    path:'test/:id',
    component:TestWindowComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
