package my.uni.services.studentsvc.course;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CourseRepository extends JpaRepository<Course, String> {

    Optional<Course> findFirstByCourseCode(String courseCode);

}
