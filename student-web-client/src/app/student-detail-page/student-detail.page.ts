import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { CoursesService } from '../courses.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Student } from '../student';
import { Course } from '../course';
import { CourseRegistry } from '../course-registry';

@Component({
  selector: 'app-student-detail-page',
  templateUrl: './student-detail.page.html',
  styleUrls: ['./student-detail.page.css']
})
export class StudentDetailPage implements OnInit {

  studentDetail$: Observable<Student>;
  availableCourses$: Observable<Course[]>
  registeredCourses$: Observable<CourseRegistry[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentSvc: StudentService,
    private courseSvc: CoursesService
  ) { }

  ngOnInit() {
    this.studentDetail$ = this.activatedRoute.paramMap.pipe(map(() => window.history.state))
    this.availableCourses$ = this.courseSvc.fetchAvailableCourses();
    this.registeredCourses$ = this.courseSvc.fetchRegisteredCoursesByStudentId('ba582a82-1ce8-4299-bea3-dc674719d834');
  }

}
