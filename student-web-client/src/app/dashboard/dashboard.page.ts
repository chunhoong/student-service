import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Student } from '../student';
import { StudentService } from '../student.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.css']
})
export class DashboardPage implements OnInit, OnDestroy {

  students: Student[] = [];
  searchStudentForm: FormGroup;
  fetchStudentSubscription: Subscription;
  searchStudentSubsription: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private studentSvc: StudentService
  ) { }

  ngOnInit() {
    this.searchStudentForm = this.fb.group({
      courseCode: ['', Validators.required]
    });
    this.fetchStudent();
  }

  ngOnDestroy() {
    this.fetchStudentSubscription.unsubscribe();
    if (this.searchStudentSubsription) {
      this.searchStudentSubsription.unsubscribe();
    }
  }

  searchStudentByCourse(courseCode: string) {
    if (!this.searchStudentForm.valid) {
      alert('Please enter a valid course ID');
    }

    this.searchStudentSubsription = this.studentSvc.fetchStudentsByCourse(
      this.searchStudentForm.get('courseCode').value
    ).subscribe(
      students => {
        this.students = students;
      },
      error => {
        console.log(error);
      }
    );
  }

  registerStudent() {
    this.router.navigateByUrl('/students/new');
  }

  removeStudent(student: Student) {
    let hasConfirmed = window.confirm(`${student.firstName} and his/her related records will be removed. Do you want to continue?`);
    if (hasConfirmed) {
      this.studentSvc.removeStudentAndRegisteredCourses(student.studentId)
        .subscribe(
          () => {
            alert(`${student.firstName} and his/her related records is successfully removed`);
            window.location.reload();
          },
          e => {
            alert(e);
          }
        )
    }
  }

  fetchStudent() {
    this.fetchStudentSubscription = this.studentSvc.fetchStudents()
      .subscribe(
        students => {
          this.students = students;
        },
        error => {
          console.log(error);
        }
      );
  }

  resetFormAndList() {
    this.searchStudentForm.patchValue({ courseCode: '' });
    this.fetchStudent();
  }

}
