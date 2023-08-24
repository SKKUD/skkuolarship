package dev.skku.scholar.backend.login;

import dev.skku.scholar.backend.domain.User;
import dev.skku.scholar.backend.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.junit.Assert.assertEquals;

@Transactional //이게 있어야 롤백이 가능함.
@ExtendWith(SpringExtension.class) // Spring과 JUnit 연동
@SpringBootTest // Spring Boot 테스트 환경 설정
public class login {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private BCryptPasswordEncoder encoder;
    @Test
    public void 회원정보_업데이트_테스트() throws Exception {
        //given
        User user = userRepo.findByUsername("example_user")
                .orElseThrow(() -> new UsernameNotFoundException("해당 유저를 찾을 수 없습니다."));
        //then
//        String hashpwd = encoder.encode("1111");
//        System.out.println(hashpwd);
//        encoder.matches(hashpwd, user.getPassword());
//        assertEquals(encoder.matches("pwd", user.getPassword()), true);

    }
}
