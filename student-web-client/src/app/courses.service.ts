import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private static readonly baseUrl = 'http://localhost/api/courses'

  constructor(private http: HttpClient) { }

  fetchAvailableCourses() {
    return this.http.get(CoursesService.baseUrl);
  }
}
