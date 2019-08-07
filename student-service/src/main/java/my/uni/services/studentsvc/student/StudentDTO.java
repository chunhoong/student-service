package my.uni.services.studentsvc.student;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
class StudentDTO {

    private String studentId;
    private String firstName;
    private String lastName;

}
