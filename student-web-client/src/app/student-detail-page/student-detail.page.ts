import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { CoursesService } from '../courses.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Student } from '../student';

@Component({
  selector: 'app-student-detail-page',
  templateUrl: './student-detail.page.html',
  styleUrls: ['./student-detail.page.css']
})
export class StudentDetailPage implements OnInit {

  state$: Observable<Student>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentSvc: StudentService,
    private courseSvc: CoursesService
  ) { }

  ngOnInit() {
    this.state$ = this.activatedRoute.paramMap.pipe(map(() => window.history.state))
  }

}
