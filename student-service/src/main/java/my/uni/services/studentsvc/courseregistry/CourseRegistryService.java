package my.uni.services.studentsvc.courseregistry;

import my.uni.services.studentsvc.course.Course;
import my.uni.services.studentsvc.course.CourseDTO;
import my.uni.services.studentsvc.course.CourseRepository;
import my.uni.services.studentsvc.exceptions.ResourceNotFoundException;
import my.uni.services.studentsvc.student.Student;
import my.uni.services.studentsvc.student.StudentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseRegistryService {

    private static Logger logger = LoggerFactory.getLogger(CourseRegistryService.class);

    private CourseRegistryRepository courseRegistryRepo;
    private CourseRepository courseRepo;
    private StudentRepository studentRepo;

    @Autowired
    public CourseRegistryService(CourseRegistryRepository courseRegistryRepo, CourseRepository courseRepo, StudentRepository studentRepo) {
        this.courseRegistryRepo = courseRegistryRepo;
        this.courseRepo = courseRepo;
        this.studentRepo = studentRepo;
    }

    void registerCourse(CourseRegistryForm courseRegistry) {
        Course c = courseRepo.findById(courseRegistry.getCourseId()).orElseThrow(ResourceNotFoundException::new);
        Student s = studentRepo.findById(courseRegistry.getStudentId()).orElseThrow(ResourceNotFoundException::new);
        this.courseRegistryRepo.save(new CourseRegistry().setCourse(c).setStudent(s));
    }

    List<CourseRegistryDTO> findRegisteredCoursesByStudentId(String studentId) {
        Student s = studentRepo.findById(studentId).orElseThrow(ResourceNotFoundException::new);
        var courseRegistryList = courseRegistryRepo.findByStudent(s);
        logger.debug("Student {} has registered for {} courses", studentId, courseRegistryList.size());
        return courseRegistryList.stream()
                .map(cr -> {
                    var course = new CourseDTO()
                            .setCourseCode(cr.getCourse().getCourseCode())
                            .setCourseDescription(cr.getCourse().getCourseDescription())
                            .setCourseId(cr.getCourse().getCourseId())
                            .setCourseName(cr.getCourse().getCourseName());
                    return new CourseRegistryDTO()
                            .setCourseRegistryId(cr.getCourseRegistryId())
                            .setCourse(course);
                })
                .collect(Collectors.toList());
    }

}
