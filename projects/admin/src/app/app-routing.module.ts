import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { CreateTestComponent } from './components/dashboard/create-test/create-test.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ViewQuestionsComponent } from './components/dashboard/view-questions/view-questions.component';
import { ViewStudentsComponent } from './components/dashboard/view-students/view-students.component';
import { ViewTestsComponent } from './components/dashboard/view-tests/view-tests.component';

const routes: Routes = [
  {
    path:'auth',
    component: AuthComponent
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: ViewTestsComponent, pathMatch: 'full' },
      { path: 'edit-test/:id', component: CreateTestComponent, pathMatch: 'full' },
      { path: 'create-test', component: CreateTestComponent, pathMatch: 'full' },
      { path: 'view-students', component: ViewStudentsComponent, pathMatch: 'full' },
      { path: 'questions', component: ViewQuestionsComponent, pathMatch: 'full' },
      // { path: 'analytics', component: AnalyticsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
