package my.uni.services.student.student;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
class NewStudent {

    @NotBlank(message = "First name cannot be empty")
    private String firstName;

    @NotBlank(message = "Last name cannot be empty")
    private String lastName;

}
