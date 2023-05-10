import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ViewTestsComponent } from './components/dashboard/view-tests/view-tests.component';
import { CreateTestComponent } from './components/dashboard/create-test/create-test.component';
import { ViewStudentsComponent } from './components/dashboard/view-students/view-students.component';
import { ViewQuestionsComponent } from './components/dashboard/view-questions/view-questions.component';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { AccordionModule } from 'primeng/accordion';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ChartModule } from 'primeng/chart';
import { ChipModule } from 'primeng/chip';
import { PanelModule } from 'primeng/panel';
import { CalendarModule } from 'primeng/calendar';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { NoticeBoardComponent } from './components/dashboard/notice-board/notice-board.component';
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardComponent,
    ViewTestsComponent,
    CreateTestComponent,
    ViewStudentsComponent,
    ViewQuestionsComponent,
    LoginComponent,
    SignupComponent,
    NoticeBoardComponent,
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
    CalendarModule
  ],
  providers: [MessageService,ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
