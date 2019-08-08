import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Student } from '../student';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.css']
})
export class DashboardPage implements OnInit {

  students$: Observable<Student[]>;

  constructor(private router: Router, private studentSvc: StudentService) { }

  ngOnInit() {
    this.students$ = this.studentSvc.fetchStudents();
  }

  registerStudent() {
    this.router.navigateByUrl('/students/new')
  }

  removeStudent(student: Student) {
    let hasConfirmed = window.confirm(`${student.firstName} and his/her related records will be removed. Do you want to continue?`);
    if (hasConfirmed) {
      this.studentSvc.removeStudentAndRegisteredCourses(student.studentId)
        .subscribe(
          () => {
            alert(`${student.firstName} and his/her related records is successfully removed`);
          },
          e => {
            alert(e);
          }
        )
    }
  }

}
