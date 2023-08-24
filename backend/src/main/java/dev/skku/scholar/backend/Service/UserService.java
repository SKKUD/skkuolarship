package dev.skku.scholar.backend.Service;

import dev.skku.scholar.backend.domain.User;
import dev.skku.scholar.backend.dto.JoinRequest;
import dev.skku.scholar.backend.dto.LoginRequest;
import dev.skku.scholar.backend.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.juli.logging.Log;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class UserService {
        private final BCryptPasswordEncoder encoder;
        private final UserRepo userRepository;

        /**
         * loginId 중복 체크
         * 회원가입 기능 구현 시 사용
         * 중복되면 true return
         */
        public boolean checkLoginIdDuplicate(String loginId) {
            return userRepository.existsByUsername(loginId);
        }



        /**
         * 회원가입 기능 1
         * 화면에서 JoinRequest(loginId, password, nickname)을 입력받아 User로 변환 후 저장
         * loginId, nickname 중복 체크는 Controller에서 진행 => 에러 메세지 출력을 위해
         */
//        public void join(JoinRequest req) {
//            userRepository.save(req.toEntity());
//        }

        /**
         * 회원가입 기능 2
         * 화면에서 JoinRequest(loginId, password, nickname)을 입력받아 User로 변환 후 저장
         * 회원가입 1과는 달리 비밀번호를 암호화해서 저장
         * loginId, nickname 중복 체크는 Controller에서 진행 => 에러 메세지 출력을 위해
         */
        public void join2(JoinRequest req) {
            userRepository.save(req.toEntity(encoder.encode(req.getPassword())));
        }

        /**
         *  로그인 기능
         *  화면에서 LoginRequest(loginId, password)을 입력받아 loginId와 password가 일치하면 User return
         *  loginId가 존재하지 않거나 password가 일치하지 않으면 null return
         */
        public User login(LoginRequest req) {
            Optional<User> optionalUser = userRepository.findByUsername(req.getUsername());

            // loginId와 일치하는 User가 없으면 null return
            if(optionalUser.isEmpty()) {
                return null;
            }

            User user = optionalUser.get();

            // 찾아온 User의 password와 입력된 password가 다르면 null return
            /*if(!user.getPassword().equals(req.getPassword())) {
                log.info("different");
                return null;
            }*/
            if(!encoder.matches(req.getPassword(), user.getPassword())) {
                log.info("different");
                return null;
            }

            return user;
        }

        /**
         * userId(Long)를 입력받아 User을 return 해주는 기능
         * 인증, 인가 시 사용
         * userId가 null이거나(로그인 X) userId로 찾아온 User가 없으면 null return
         * userId로 찾아온 User가 존재하면 User return
         */
        public User getLoginUsername(Long username) {
            if(username == null) return null;

            Optional<User> optionalUser = userRepository.findById(username);
            if(optionalUser.isEmpty()) return null;

            return optionalUser.get();
        }

        /**
         * loginId(String)를 입력받아 User을 return 해주는 기능
         * 인증, 인가 시 사용
         * loginId가 null이거나(로그인 X) userId로 찾아온 User가 없으면 null return
         * loginId로 찾아온 User가 존재하면 User return
         */
        public User getLoginUserByUsername(String username) {
            if(username == null) return null;

            Optional<User> optionalUser = userRepository.findByUsername(username);
            if(optionalUser.isEmpty()) return null;

            return optionalUser.get();
        }

    public boolean isUsernameTaken(String username) {
        return userRepository.existsByUsername(username);
    }

    @Transactional
    public void createUser(User newUser) {
        userRepository.save(newUser);
    }
}
