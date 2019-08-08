import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CoursesService } from '../courses.service';
import { Course } from '../course';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { StudentService } from '../student.service';
import { Student } from '../student';

@Component({
  selector: 'app-student-registration-page',
  templateUrl: './student-registration-page.html',
  styleUrls: ['./student-registration-page.css']
})
export class StudentRegistrationPage implements OnInit, OnDestroy {

  availableCourses: Course[];
  studentForm: FormGroup;
  registrationSubscription: Subscription;
  coursesToBeRegistered: string[] = [];

  constructor(
    private fb: FormBuilder,
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

  ngOnDestroy() {
    this.registrationSubscription.unsubscribe();
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
