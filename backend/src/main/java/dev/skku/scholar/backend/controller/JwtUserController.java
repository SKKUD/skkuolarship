package dev.skku.scholar.backend.controller;

import dev.skku.scholar.backend.Service.UserService;
import dev.skku.scholar.backend.domain.User;
import dev.skku.scholar.backend.dto.JoinRequest;
import dev.skku.scholar.backend.dto.LoginRequest;
import dev.skku.scholar.backend.jwt.JwtTokenUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
public class JwtUserController {

    private final UserService userService;
    private final BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/signUp")
    public ResponseEntity<String> signUp(@RequestBody @Valid JoinRequest joinRequest) {
        // Check if username is already taken
        if (userService.isUsernameTaken(joinRequest.getUsername())) {
            return ResponseEntity.badRequest().body("Username is already taken.");
        }

        User newUser = User.builder()
                .username(joinRequest.getUsername())
                .password(passwordEncoder.encode(joinRequest.getPassword()))
                .email(joinRequest.getEmail())
                .sex(joinRequest.getSex())
                .birth(joinRequest.getBirth())
                .major(joinRequest.getMajor())
                .semester(joinRequest.getSemester())
                .incomeBracket(joinRequest.getIncomeBracket())
                .gpa(joinRequest.getGpa())
                .lastSemGpa(joinRequest.getLastSemGpa())
                .residence(joinRequest.getResidence())
                .enrollStatus(joinRequest.getEnrollStatus())
                .build();

        userService.createUser(newUser);

        return ResponseEntity.ok("User registered successfully.");
    }


    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {

        User user = userService.login(loginRequest);

        // 로그인 아이디나 비밀번호가 틀린 경우 global error return
        if(user == null) {
            return ResponseEntity.ok("로그인 아이디 또는 비밀번호가 틀렸습니다.");
        }
        // 로그인 성공 => Jwt Token 발급
        String secretKey = "my-secret-key-123123";
        long expireTimeMs = 1000 * 60 * 60;     // Token 유효 시간 = 60분

        String jwtToken = JwtTokenUtil.createToken(user.getUsername(), secretKey, expireTimeMs);

        return ResponseEntity.ok(jwtToken);
    }

    @GetMapping("/home")
    public String userHome(Authentication auth) {
        User loginUser = userService.getLoginUserByUsername(auth.getName());
        return String.format("username : %s\n",
                loginUser.getUsername());
    }
    /*@PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {

        return ResponseEntity.ok("Logged out successfully");
    }*/
}
