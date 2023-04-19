import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AnalyticsComponent } from './components/dashboard/analytics/analytics.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TestsComponent } from './components/dashboard/tests/tests.component';
import { TestWindowComponent } from './components/test-window/test-window.component';

const routes: Routes = [
  // {path:'',component:}
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: '', component: LoginComponent, pathMatch: 'full' },
      { path: 'signup', component: SignupComponent },
    ],
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
    path:'test',
    component:TestWindowComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
