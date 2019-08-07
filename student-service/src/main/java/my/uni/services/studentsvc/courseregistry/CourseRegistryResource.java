package my.uni.services.studentsvc.courseregistry;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/course-registries")
public class CourseRegistryResource {

    private CourseRegistryService courseRegistrySvc;

    @Autowired
    public CourseRegistryResource(CourseRegistryService courseRegistrySvc) {
        this.courseRegistrySvc = courseRegistrySvc;
    }

    @PostMapping
    public void registerCourse(@RequestBody @Valid CourseRegistryForm courseRegistry) {
        courseRegistrySvc.registerCourse(courseRegistry);
    }

    @GetMapping()
    public List<CourseRegistryDTO> findRegisteredCoursesByStudentId(@RequestParam String studentId) {
        return courseRegistrySvc.findRegisteredCoursesByStudentId(studentId);
    }

}
