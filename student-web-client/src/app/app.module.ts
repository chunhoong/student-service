import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardPage } from './dashboard/dashboard.page';
import { NavbarComponent } from './navbar/navbar.component';
import { StudentDetailPage } from './student-detail-page/student-detail.page';

@NgModule({
  declarations: [
    AppComponent,
    DashboardPage,
    NavbarComponent,
    StudentDetailPage
  ],
  imports: [
    BrowserModule, HttpClientModule, AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
