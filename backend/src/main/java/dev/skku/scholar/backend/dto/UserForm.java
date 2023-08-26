package dev.skku.scholar.backend.dto;


import dev.skku.scholar.backend.domain.EEnrollment;
import dev.skku.scholar.backend.domain.ESex;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class UserForm {
    private String username;
    private String email;
    private ESex sex;
    private LocalDateTime birth;
    private String major;
    private Integer semester;
    private Integer incomeBracket;
    private float gpa;
    private float lastSemGpa;
    private String residence;
    private EEnrollment enrollStatus;

}
