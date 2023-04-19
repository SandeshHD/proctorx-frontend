import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TestsComponent } from './components/dashboard/tests/tests.component';
import { AnalyticsComponent } from './components/dashboard/analytics/analytics.component';
import { TestComponent } from './components/dashboard/tests/test/test.component';
import {TableModule} from 'primeng/table';
import { StatcardComponent } from './components/dashboard/analytics/statcard/statcard.component';
import {ChartModule} from 'primeng/chart';
import { ActivityComponent } from './components/dashboard/analytics/activity/activity.component';
import { TestInfoComponent } from './components/dashboard/tests/test-info/test-info.component';
import { TestWindowComponent } from './components/test-window/test-window.component';
import { MessageService } from 'primeng/api';
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    TestsComponent,
    AnalyticsComponent,
    TestComponent,
    StatcardComponent,
    ActivityComponent,
    TestInfoComponent,
    TestWindowComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    DropdownModule,
    InputTextModule,
    ToastModule,
    InputNumberModule,
    TableModule,
    ChartModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
