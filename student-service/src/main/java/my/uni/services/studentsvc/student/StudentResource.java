package my.uni.services.studentsvc.student;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/api/students")
public class StudentResource {

    private static Logger logger = LoggerFactory.getLogger(StudentResource.class);

    private StudentService studentSvc;

    @Autowired
    public StudentResource(StudentService studentSvc) {
        this.studentSvc = studentSvc;
    }

    @PostMapping
    public StudentDTO registerStudent(@Valid @RequestBody StudentForm student) {
        logger.debug("registerStudent start");
        return this.studentSvc.registerStudent(student);
    }

    @GetMapping
    public List<StudentDTO> listStudents(@RequestParam(name = "courseCode", defaultValue = "") String courseCode) {
        if (courseCode.equals("")) {
            logger.debug("listStudents start");
        } else {
            logger.debug("listStudents start: -> Course: {}", courseCode);
        }
        return courseCode.equals("") ? this.studentSvc.listStudents() : this.studentSvc.listStudentsByCourse(courseCode);
    }

    @GetMapping(value = "/{studentId}")
    public StudentDTO findStudentById(@PathVariable String studentId) {
        logger.debug("findStudentById start -> studentId: {} ", studentId);
        return this.studentSvc.findStudentById(studentId);
    }

    @PutMapping("/{studentId}")
    public void updateStudent(@PathVariable String studentId, @Valid @RequestBody StudentForm student) {
        logger.debug("updateStudent start");
        this.studentSvc.updateStudent(studentId, student);
    }

    @DeleteMapping("/{studentId}")
    public void removeStudent(@PathVariable String studentId) {
        logger.debug("removeStudent -> start");
        this.studentSvc.removeStudent(studentId);
    }

}

