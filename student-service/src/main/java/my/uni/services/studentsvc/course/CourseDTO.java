package my.uni.services.studentsvc.course;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class CourseDTO {

    private String courseId;
    private String courseCode;
    private String courseName;
    private String courseDescription;

}
