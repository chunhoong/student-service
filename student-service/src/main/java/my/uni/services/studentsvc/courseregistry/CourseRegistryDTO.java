package my.uni.services.studentsvc.courseregistry;

import lombok.Data;
import lombok.experimental.Accessors;
import my.uni.services.studentsvc.course.CourseDTO;

@Data
@Accessors(chain = true)
class CourseRegistryDTO {

    private String courseRegistryId;
    private CourseDTO course;

}
