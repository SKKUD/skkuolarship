package dev.skku.scholar.backend.controller;
import dev.skku.scholar.backend.Service.ScholarshipService;
import dev.skku.scholar.backend.domain.Scholarship;
import dev.skku.scholar.backend.dto.ScholarshipDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
public class ScholarshipController {
    private final ScholarshipService scholarshipService;

    @GetMapping("/all")
    public ResponseEntity<List<ScholarshipDTO>> getAllScholarshipsWithKeywords() {
        Map<Scholarship, List<String>> scholarshipAndKeywords = scholarshipService.scholarshipWithKeywords();
        List<ScholarshipDTO> scholarshipsWithInfo = new ArrayList<>();

        for (Map.Entry<Scholarship, List<String>> entry : scholarshipAndKeywords.entrySet()) {
            Scholarship scholarship = entry.getKey();
            List<String> keywordsList = entry.getValue();

            ScholarshipDTO scholarshipDTO = new ScholarshipDTO();
            scholarshipDTO.setId(scholarship.getId());
            scholarshipDTO.setTitle(scholarship.getTitle());
            scholarshipDTO.setDepartment(scholarship.getDepartment());
            scholarshipDTO.setViewCount(scholarship.getViewCount());
            scholarshipDTO.setApplyStartAt(scholarship.getApplyStartAt());
            scholarshipDTO.setApplyEndAt(scholarship.getApplyEndAt());
            scholarshipDTO.setNumSelection(scholarship.getNumSelection());
            scholarshipDTO.setBenefit(scholarship.getBenefit());
            scholarshipDTO.setApplyMethod(scholarship.getApplyMethod());
            scholarshipDTO.setTarget(scholarship.getTarget());
            scholarshipDTO.setContact(scholarship.getContact());
            scholarshipDTO.setOriginUrl(scholarship.getOriginUrl());
            scholarshipDTO.setKeywords(keywordsList);

            scholarshipsWithInfo.add(scholarshipDTO);
        }

        return ResponseEntity.ok(scholarshipsWithInfo);
    }
//    @GetMapping("/all/{id}")
//    public ResponseEntity<Scholarship> getScholarshipById(@PathVariable Long id) {
//        Scholarship scholarship = scholarshipService.findScholarshipById(id);
//
//        if (scholarship == null) {
//            return ResponseEntity.notFound().build();
//        }
//
//        return ResponseEntity.ok(scholarship);
//    }
}
