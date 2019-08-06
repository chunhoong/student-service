import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardPage } from './dashboard/dashboard.page';
import { StudentDetailPage } from './student-detail-page/student-detail.page';

const routes = [
  {
    path: '',
    component: DashboardPage
  },
  {
    path: 'students/:studentId',
    component: StudentDetailPage
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
