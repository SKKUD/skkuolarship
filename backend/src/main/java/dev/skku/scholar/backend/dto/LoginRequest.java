package dev.skku.scholar.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {
    @NotBlank(message = "로그인 아이디가 비어있습니다.")
    private String username;
    @NotBlank(message = "비밀번호 아이디가 비어있습니다.")
    private String password;
}
