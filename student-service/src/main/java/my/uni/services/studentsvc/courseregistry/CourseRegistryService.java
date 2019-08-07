package my.uni.services.studentsvc.courseregistry;

import my.uni.services.studentsvc.course.Course;
import my.uni.services.studentsvc.course.CourseRepository;
import my.uni.services.studentsvc.exceptions.ResourceNotFoundException;
import my.uni.services.studentsvc.student.Student;
import my.uni.services.studentsvc.student.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CourseRegistryService {

    private CourseRegistryRepository courseRegistryRepo;
    private CourseRepository courseRepo;
    private StudentRepository studentRepo;

    @Autowired
    public CourseRegistryService(CourseRegistryRepository courseRegistryRepo, CourseRepository courseRepo, StudentRepository studentRepo) {
        this.courseRegistryRepo = courseRegistryRepo;
        this.courseRepo = courseRepo;
        this.studentRepo = studentRepo;
    }

    void registerCourse(NewCourseRegistry courseRegistry) {
        Course c = courseRepo.findById(courseRegistry.getCourseId()).orElseThrow(ResourceNotFoundException::new);
        Student s = studentRepo.findById(courseRegistry.getStudentId()).orElseThrow(ResourceNotFoundException::new);
        this.courseRegistryRepo.save(new CourseRegistry().setCourse(c).setStudent(s));
    }

}
