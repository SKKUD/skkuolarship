package dev.skku.scholar.backend.dto;

import dev.skku.scholar.backend.domain.EEnrollment;
import dev.skku.scholar.backend.domain.ESex;
import dev.skku.scholar.backend.domain.User;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
public class JoinRequest {
    @NotBlank(message = "로그인 아이디가 비어있습니다.")
    private String username;

    @NotBlank(message = "비밀번호가 비어있습니다.")
    private String password;

    private String email;

    private ESex sex;

    private LocalDateTime birth;

    private String major;

    private Integer semester;

    private EEnrollment enrollStatus;

    private float gpa;

    private float lastSemGpa;

    private Integer incomeBracket;

    private String residence;

    public User toEntity(String encodedPassword) {
        return User.builder()
                .username(this.username)
                .password(encodedPassword)
                .email(this.email)
                .sex(this.sex)
                .birth(this.birth)
                .major(this.major)
                .semester(this.semester)
                .enrollStatus(this.enrollStatus)
                .gpa(Float.valueOf(this.gpa))
                .lastSemGpa(Float.valueOf(this.lastSemGpa))
                .incomeBracket(this.incomeBracket)
                .residence(this.residence)
                .build();
    }
}
