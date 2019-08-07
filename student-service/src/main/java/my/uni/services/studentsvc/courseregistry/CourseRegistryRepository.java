package my.uni.services.studentsvc.courseregistry;

import my.uni.services.studentsvc.course.Course;
import my.uni.services.studentsvc.student.Student;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CourseRegistryRepository extends CrudRepository<CourseRegistry, String> {

    List<CourseRegistry> findByStudent(Student student);

    List<CourseRegistry> findByCourse(Course course);

}
