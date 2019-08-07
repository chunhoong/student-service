package my.uni.services.studentsvc.course;

import my.uni.services.studentsvc.exceptions.ResourceNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseService {

    private Logger logger = LoggerFactory.getLogger(CourseService.class);

    private CourseRepository courseRepo;

    @Autowired
    public CourseService(CourseRepository courseRepo) {
        this.courseRepo = courseRepo;
    }

    List<CourseDTO> listCourses() {
        return courseRepo.findAll().stream()
                .map(c -> new CourseDTO()
                        .setCourseId(c.getCourseId())
                        .setCourseCode(c.getCourseCode())
                        .setCourseName(c.getCourseName())
                        .setCourseDescription(c.getCourseDescription())
                )
                .collect(Collectors.toList());
    }

}
