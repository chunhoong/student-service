package my.uni.services.studentsvc.courseregistry;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
class NewCourseRegistry {

    @NotBlank(message = "Course id cannot be empty")
    private String courseId;

    @NotBlank(message = "Student id cannot be empty")
    private String studentId;

}
