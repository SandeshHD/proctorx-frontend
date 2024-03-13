import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NoticeBoardComponent } from './components/dashboard/notice-board/notice-board.component';
import { ViewBranchesComponent } from './components/dashboard/view-branches/view-branches.component';
import { ViewFacultiesComponent } from './components/dashboard/view-faculties/view-faculties.component';
import { ViewQuestionsComponent } from './components/dashboard/view-questions/view-questions.component';
import { ViewStudentsComponent } from './components/dashboard/view-students/view-students.component';
import { ViewTestsComponent } from './components/dashboard/view-tests/view-tests.component';
import { ViewTopicsComponent } from './components/dashboard/view-topics/view-topics.component';

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
      { path: 'view-students', component: ViewStudentsComponent, pathMatch: 'full' },
      { path: 'questions', component: ViewQuestionsComponent, pathMatch: 'full' },
      { path: 'faculties', component: ViewFacultiesComponent, pathMatch: 'full' },
      { path: 'branches', component: ViewBranchesComponent, pathMatch: 'full' },
      { path: 'topics', component: ViewTopicsComponent, pathMatch: 'full' },
      { path: 'notice-board', component: NoticeBoardComponent, pathMatch: 'full' },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

