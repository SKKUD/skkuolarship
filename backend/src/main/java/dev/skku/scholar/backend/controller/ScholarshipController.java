package dev.skku.scholar.backend.controller;
import dev.skku.scholar.backend.Service.ScholarshipService;
import dev.skku.scholar.backend.Service.UserService;
import dev.skku.scholar.backend.domain.Scholarship;
import dev.skku.scholar.backend.domain.ScholarshipTag;
import dev.skku.scholar.backend.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequiredArgsConstructor
@Slf4j
public class ScholarshipController {
    private final ScholarshipService scholarshipService;
    private final UserService userService;
    private final TagRepository scholarshipTagRepository;

    @GetMapping("/all")
    public ResponseEntity<List<Scholarship>> AllList() {
        List<Scholarship> items = scholarshipService.findScholarships();
        return ResponseEntity.ok(items);
    }
    @GetMapping("/all/{id}")
    public ResponseEntity<Scholarship> getScholarshipById(@PathVariable Long id) {
        Scholarship scholarship = scholarshipService.findScholarshipById(id);

        if (scholarship == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(scholarship);
    }
}
