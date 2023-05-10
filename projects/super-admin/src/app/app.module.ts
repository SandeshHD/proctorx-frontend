import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ViewTestsComponent } from './components/dashboard/view-tests/view-tests.component';
import { ViewQuestionsComponent } from './components/dashboard/view-questions/view-questions.component';
import { ViewStudentsComponent } from './components/dashboard/view-students/view-students.component';
import { ChartModule } from 'primeng/chart';
import { ViewFacultiesComponent } from './components/dashboard/view-faculties/view-faculties.component';
import { ViewBranchesComponent } from './components/dashboard/view-branches/view-branches.component';
import { ViewTopicsComponent } from './components/dashboard/view-topics/view-topics.component';
import { NoticeBoardComponent } from './components/dashboard/notice-board/notice-board.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardComponent,
    ViewTestsComponent,
    ViewQuestionsComponent,
    ViewStudentsComponent,
    ViewFacultiesComponent,
    ViewBranchesComponent,
    ViewTopicsComponent,
    NoticeBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule,
    InputTextModule,
    TableModule,
    TagModule,
    DropdownModule,
    TooltipModule,
    ButtonModule,
    DialogModule,
    AccordionModule,
    ConfirmPopupModule,
    OverlayPanelModule,
    PanelModule,
    ChartModule,
    ChipModule,
  ],
  providers: [MessageService,ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
