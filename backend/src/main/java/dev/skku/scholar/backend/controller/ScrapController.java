package dev.skku.scholar.backend.controller;

import dev.skku.scholar.backend.Service.ScrapService;
import dev.skku.scholar.backend.domain.Scholarship;
import dev.skku.scholar.backend.jwt.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static dev.skku.scholar.backend.controller.SecurityConfig.secretKey;

@RestController
@RequiredArgsConstructor
@Slf4j
public class ScrapController {
    private final ScrapService scrapService;

    @GetMapping("/scrap")
    public List<Scholarship> getScrapScholarships(@RequestHeader("Authorization") String authorizationHeader) {
        String token = extractToken(authorizationHeader);
        String username = JwtTokenUtil.getLoginId(token, secretKey);
        return scrapService.getScrapScholarships(username);
    }
    @PostMapping("/scrap/{id}")
    public void getScrapScholarships(@RequestHeader("Authorization") String authorizationHeader, @PathVariable Long id) {
        String token = extractToken(authorizationHeader);
        String username = JwtTokenUtil.getLoginId(token, secretKey);
        scrapService.setScrapScholarships(username, id);
    }
    private String extractToken(String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7);
        }
        return null;
    }


}
