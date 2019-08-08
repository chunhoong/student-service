import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardPage } from './dashboard/dashboard.page';
import { NavbarComponent } from './navbar/navbar.component';
import { StudentDetailPage } from './student-detail-page/student-detail.page';
import { StudentRegistrationPage } from './student-registration-page/student-registration-page';

@NgModule({
  declarations: [
    AppComponent,
    DashboardPage,
    NavbarComponent,
    StudentDetailPage,
    StudentRegistrationPage
  ],
  imports: [
    BrowserModule, HttpClientModule, AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
