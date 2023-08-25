package dev.skku.scholar.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ExampleController {

   /* private final UserService userService;

    @GetMapping("/")
    public String home(Model model, Authentication auth) {
        if(auth != null) {
            User loginUser = userService.getLoginUserByUsername(auth.getName());
            if (loginUser != null) {
                model.addAttribute("username", loginUser.getUsername());
            }
        }
        return "home";
    }

    @GetMapping("/join")
    public String joinPage(Model model) {
        model.addAttribute("joinForm", new JoinForm());
        return "join";
    }

    @PostMapping("/join")
    public String join(@Valid @ModelAttribute JoinForm joinForm, BindingResult bindingResult) {
        // loginId 중복 체크
        if(userService.checkLoginIdDuplicate(joinForm.getUsername())) {
            bindingResult.addError(new FieldError("joinForm", "username", "로그인 아이디가 중복됩니다."));
        }
        // password와 passwordCheck가 같은지 체크
        if(!joinForm.getPassword().equals(joinForm.getPasswordCheck())) {
            bindingResult.addError(new FieldError("joinForm", "passwordCheck", "바밀번호가 일치하지 않습니다."));
        }

        if(bindingResult.hasErrors()) {
            return "join";
        }

        userService.join2(joinForm);
        return "redirect:/login";
    }

    @GetMapping("/login")
    public String loginPage(Model model) {
        model.addAttribute("loginForm", new LoginForm());
        return "login";
    }

    @GetMapping("/info")
    public String userInfo(Authentication auth) {

        User loginUser = userService.getLoginUserByUsername(auth.getName());
        if(loginUser == null) {
            return "redirect:/login";
        }
        return "info";
    }
*/

}
