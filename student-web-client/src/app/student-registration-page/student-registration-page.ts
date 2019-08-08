import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Course } from '../course';
import { CoursesService } from '../courses.service';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-registration-page',
  templateUrl: './student-registration-page.html',
  styleUrls: ['./student-registration-page.css']
})
export class StudentRegistrationPage implements OnInit {

  availableCourses: Course[];
  studentForm: FormGroup;
  coursesToBeRegistered: string[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private courseSvc: CoursesService,
    private studentSvc: StudentService
  ) { }

  ngOnInit() {
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });

    this.fetchAvailableCourses();
  }

  fetchAvailableCourses() {
    this.courseSvc.fetchAvailableCourses()
      .subscribe(
        availableCourses => {
          this.availableCourses = availableCourses;
        }
      );
  }

  async onRegister() {
    if (this.studentForm.valid) {
      let firstName = this.studentForm.get('firstName').value;
      let lastName = this.studentForm.get('lastName').value;
      
      try {
        let s: Student = await this.studentSvc.registerStudent({ firstName, lastName }).toPromise();
        console.log(`Student is successfully registered with id: ${s.studentId}`);
        console.log(`Courses to register: ${JSON.stringify(this.coursesToBeRegistered)}`);
        for (let i = 0; i < this.coursesToBeRegistered.length; i++) {
          console.log(`Registering: ${this.coursesToBeRegistered[i]}`);
          await this.courseSvc.registerCourse(this.coursesToBeRegistered[i], s.studentId).toPromise();
        }
        alert(`Registration complete`);
        this.router.navigateByUrl('/');
      }
      catch (e) {
        alert(e);
      }
    }
  }

  updateCoursesTobeRegistered(courseCode: string) {
    console.log(`CoursesToBeRegistered[before]: ${JSON.stringify(this.coursesToBeRegistered)}`);
    if (this.coursesToBeRegistered.includes(courseCode)) {
      this.coursesToBeRegistered = this.coursesToBeRegistered.filter(c => c !== courseCode);
    } else {
      this.coursesToBeRegistered.push(courseCode);
    }
    console.log(`CoursesToBeRegistered[after]: ${JSON.stringify(this.coursesToBeRegistered)}`);
  }

}
