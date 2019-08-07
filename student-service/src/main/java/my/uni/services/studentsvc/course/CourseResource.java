package my.uni.services.studentsvc.course;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseResource {

    private CourseService courseSvc;

    @Autowired
    CourseResource(CourseService courseSvc) {
        this.courseSvc = courseSvc;
    }

    @GetMapping
    public List<CourseDTO> listCourses() {
        return this.courseSvc.listCourses();
    }

}
