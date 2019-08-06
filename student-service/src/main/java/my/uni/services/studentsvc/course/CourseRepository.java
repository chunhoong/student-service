package my.uni.services.studentsvc.course;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, String> {

    CourseRepository findByCourseNameContains(String courseNameKeyword);

}
