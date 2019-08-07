package my.uni.services.studentsvc.student;

import my.uni.services.studentsvc.course.Course;
import my.uni.services.studentsvc.course.CourseRepository;
import my.uni.services.studentsvc.courseregistry.CourseRegistryRepository;
import my.uni.services.studentsvc.exceptions.ResourceNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentService {

    private static Logger logger = LoggerFactory.getLogger(StudentService.class);

    private StudentRepository studentRepo;
    private CourseRegistryRepository courseRegistryRepo;
    private CourseRepository courseRepo;

    @Autowired
    public StudentService(
            StudentRepository studentRepo,
            CourseRegistryRepository courseRegistryRepo,
            CourseRepository courseRepo
    ) {
        this.studentRepo = studentRepo;
        this.courseRegistryRepo = courseRegistryRepo;
        this.courseRepo = courseRepo;
    }

    void registerStudent(NewStudent student) {
        studentRepo.save(new Student()
                .setFirstName(student.getFirstName())
                .setLastName(student.getLastName())
        );
    }

    List<StudentDTO> listStudentsByCourse(String courseCode) {
        Course c = courseRepo.findFirstByCourseCode(courseCode).orElseThrow(ResourceNotFoundException::new);
        logger.debug("Course: {}", c);
        return courseRegistryRepo.findByCourse(c).stream()
                .map(cr -> new StudentDTO()
                        .setStudentId(cr.getStudent().getStudentId())
                        .setFirstName(cr.getStudent().getFirstName())
                        .setLastName(cr.getStudent().getLastName())
                )
                .collect(Collectors.toList());
    }

    StudentDTO findStudentById(String studentId) {
        return studentRepo.findById(studentId)
                .map(s -> new StudentDTO()
                        .setStudentId(s.getStudentId())
                        .setFirstName(s.getFirstName())
                        .setLastName(s.getLastName())
                )
                .orElseThrow(ResourceNotFoundException::new);
    }

    void updateStudent(String studentId, ExistingStudent student) {
        studentRepo.findById(studentId).map(s ->
                studentRepo.save(s
                        .setFirstName(student.getFirstName())
                        .setLastName(student.getLastName())
                )
        ).orElseThrow(ResourceNotFoundException::new);
    }

    void removeStudent(String studentId) {
        studentRepo.deleteById(studentId);
    }

}
