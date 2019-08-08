package my.uni.services.studentsvc.courseregistry;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/course-registries")
public class CourseRegistryResource {

    private static Logger logger = LoggerFactory.getLogger(CourseRegistryResource.class);
    private CourseRegistryService courseRegistrySvc;

    @Autowired
    public CourseRegistryResource(CourseRegistryService courseRegistrySvc) {
        this.courseRegistrySvc = courseRegistrySvc;
    }

    @PostMapping
    public void registerCourse(@RequestBody @Valid CourseRegistryForm courseRegistry) {
        logger.debug("registerCourse -> {} ", courseRegistry);
        courseRegistrySvc.registerCourse(courseRegistry);
    }

    @GetMapping
    public List<CourseRegistryDTO> findRegisteredCoursesByStudentId(@RequestParam String studentId) {
        return courseRegistrySvc.findRegisteredCoursesByStudentId(studentId);
    }

    @DeleteMapping
    public void removeRegisteredCourseByStudentId(@RequestParam String studentId) {
        courseRegistrySvc.removeRegisteredCourseByStudentId(studentId);
    }

}
