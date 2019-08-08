import { Component, OnInit, OnDestroy } from '@angular/core';
import { StudentService } from '../student.service';
import { CoursesService } from '../courses.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Student } from '../student';
import { Course } from '../course';
import { CourseRegistry } from '../course-registry';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-detail-page',
  templateUrl: './student-detail.page.html',
  styleUrls: ['./student-detail.page.css']
})
export class StudentDetailPage implements OnInit, OnDestroy {

  studentForm: FormGroup;
  registeredCourses: CourseRegistry[];
  studentDetail$: Observable<Student>;
  availableCourses$: Observable<Course[]>
  registeredCourses$: Observable<CourseRegistry[]>;
  fetchStudentDetailSubscription: Subscription;
  updateStudentSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private studentSvc: StudentService,
    private courseSvc: CoursesService
  ) { }

  ngOnInit() {
    this.studentDetail$ = this.activatedRoute.paramMap.pipe(map(() => window.history.state));
    this.studentForm = this.fb.group({
      studentId: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
    this.availableCourses$ = this.courseSvc.fetchAvailableCourses();
    this.fetchStudentDetail();
  }

  ngOnDestroy() {
    this.fetchStudentDetailSubscription.unsubscribe();
    if (this.updateStudentSubscription) {
      this.updateStudentSubscription.unsubscribe();
    }
  }

  fetchStudentDetail() {
    this.fetchStudentDetailSubscription = this.studentDetail$.pipe(
      tap(student => {
        console.log(`Student: ${JSON.stringify(student)}`);
        this.studentForm.patchValue({
          studentId: student.studentId,
          firstName: student.firstName,
          lastName: student.lastName
        });
      }),
      switchMap(student => this.courseSvc.fetchRegisteredCoursesByStudentId(student.studentId))
    ).subscribe(
      registeredCourses => {
        console.log(`Registered courses: ${JSON.stringify(registeredCourses)}`);
        this.registeredCourses = registeredCourses;
      },
      error => {
        alert(error);
      }
    );
  }

  updateStudent() {
    this.studentSvc.updateStudent({
      studentId: this.studentForm.get('studentId').value,
      firstName: this.studentForm.get('firstName').value,
      lastName: this.studentForm.get('lastName').value
    }).subscribe(
      () => {
        alert('Update successfully');
      },
      error => {
        alert(error);
      }
    )
  }

}
