package my.uni.services.studentsvc.course;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseService {

    private CourseRepository courseRepo;

    CourseService(CourseRepository courseRepo) {
        this.courseRepo = courseRepo;
    }

    List<CourseDTO> listCourses() {
        return courseRepo.findAll().stream()
                .map(c -> new CourseDTO()
                        .setCourseId(c.getCourseId())
                        .setCourseName(c.getCourseName())
                        .setCourseDescription(c.getCourseDescription())
                )
                .collect(Collectors.toList());
    }

}
