package dev.skku.scholar.backend.controller;

import dev.skku.scholar.backend.Service.UserService;
import dev.skku.scholar.backend.domain.User;
import dev.skku.scholar.backend.dto.JoinRequest;
import dev.skku.scholar.backend.dto.LoginRequest;
import dev.skku.scholar.backend.dto.UserForm;
import dev.skku.scholar.backend.jwt.JwtTokenUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

import static dev.skku.scholar.backend.controller.SecurityConfig.secretKey;

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
                .gpa(Float.valueOf(joinRequest.getGpa()))
                .lastSemGpa(Float.valueOf(joinRequest.getLastSemGpa()))
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
            return ResponseEntity.badRequest().body("Invalid username or password.");
        }
        // 로그인 성공 => Jwt Token 발급
        String secretKey = "my-secret-key-123123";
        long expireTimeMs = 1000 * 60 * 60;     // Token 유효 시간 = 60분

        String jwtToken = JwtTokenUtil.createToken(user.getUsername(), secretKey, expireTimeMs);

        return ResponseEntity.ok(jwtToken);
    }

    @GetMapping("/info")
    public ResponseEntity<UserForm> getLoggedInUserInfo(@RequestHeader("Authorization") String authorizationHeader) {
        String token = extractToken(authorizationHeader);
        String username = JwtTokenUtil.getLoginId(token, secretKey);

        User loggedInUser = userService.getLoginUserByUsername(username);

        if (loggedInUser != null) {
            UserForm userForm = new UserForm();
            userForm.setEmail(loggedInUser.getEmail());
            userForm.setSex(loggedInUser.getSex());
            userForm.setBirth(loggedInUser.getBirth());
            userForm.setUsername(loggedInUser.getUsername());
            userForm.setMajor(loggedInUser.getMajor());
            userForm.setSemester(loggedInUser.getSemester());
            userForm.setIncomeBracket(loggedInUser.getIncomeBracket());
            userForm.setGpa(loggedInUser.getGpa());
            userForm.setLastSemGpa(loggedInUser.getLastSemGpa());
            userForm.setResidence(loggedInUser.getResidence());
            userForm.setEnrollStatus(loggedInUser.getEnrollStatus());
            return ResponseEntity.ok(userForm);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    private String extractToken(String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7);
        }
        return null;
    }
    /*@PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {

    }*/
}
