package dev.skku.scholar.backend.controller;

import dev.skku.scholar.backend.Service.RecommendationService;
import dev.skku.scholar.backend.jwt.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static dev.skku.scholar.backend.controller.SecurityConfig.secretKey;

@RestController
@RequestMapping("/recommendation")
public class RecommendationController {

    private final RecommendationService recommendationService;

    @Autowired
    public RecommendationController(RecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }

    @GetMapping
    public List<Long> getRecommendedScholarships(@RequestHeader("Authorization") String authorizationHeader) {
        String token = extractToken(authorizationHeader);
        String username = JwtTokenUtil.getLoginId(token, secretKey);
        return recommendationService.getRecommendedScholarships(username);
    }
    private String extractToken(String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7);
        }
        return null;
    }
}
