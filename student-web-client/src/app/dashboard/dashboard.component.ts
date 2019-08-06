import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  students$: Observable<Student[]> = of([
    {
      studentId: 'A142188',
      firstName: 'Lim',
      lastName: 'Chun Hoong',
      courses: [
        {
          courseId: 'A1',
          courseName: 'Computer engineering'
        },
        {
          courseId: 'A2',
          courseName: 'Software engineering'
        }
      ]
    },
    {
      studentId: 'A142188',
      firstName: 'Lim',
      lastName: 'Chun Hoong',
      courses: [
        {
          courseId: 'A1',
          courseName: 'Computer engineering'
        }
      ]
    },
    {
      studentId: 'A142188',
      firstName: 'Lim',
      lastName: 'Chun Hoong',
      courses: [
        {
          courseId: 'A1',
          courseName: 'Computer engineering'
        }
      ]
    }
  ]);

  constructor(private studentSvc: StudentService) { }

  ngOnInit() {
  }

}
