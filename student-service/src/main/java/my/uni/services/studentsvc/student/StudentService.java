package my.uni.services.studentsvc.student;

import my.uni.services.studentsvc.course.CourseRegistryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private static Logger logger = LoggerFactory.getLogger(StudentService.class);

    private StudentRepository studentRepo;
    private CourseRegistryRepository courseRegistryRepo;

    @Autowired
    public StudentService(StudentRepository studentRepo, CourseRegistryRepository courseRegistryRepo) {
        this.studentRepo = studentRepo;
        this.courseRegistryRepo = courseRegistryRepo;
    }

    public void registerStudent(NewStudent student) {

    }

    public List<StudentDTO> listStudentsByCourse(String courseId) {
        return null;
    }

    public StudentDTO findStudentById(String studentId) {
        return null;
    }

    public void updateStudent(ExistingStudent student) {

    }

    public void removeStudent(String studentId) {

    }

}
