package dev.skku.scholar.backend.Service;

import dev.skku.scholar.backend.domain.Scholarship;
import dev.skku.scholar.backend.domain.ScholarshipScrap;
import dev.skku.scholar.backend.domain.ScholarshipTag;
import dev.skku.scholar.backend.domain.User;
import dev.skku.scholar.backend.dto.ScholarshipDTO;
import dev.skku.scholar.backend.repository.ScholarshipRepository;
import dev.skku.scholar.backend.repository.ScholarshipTagRepository;
import dev.skku.scholar.backend.repository.ScrapRepository;
import dev.skku.scholar.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class ScrapService {
    private final ScrapRepository scrapRepository;
    private final UserRepository userRepository;
    private final ScholarshipRepository scholarshipRepository;
    private final ScholarshipTagRepository scholarshipTagRepository;

    public List<ScholarshipDTO> getScrapScholarshipsWithKeywords(String username) {
        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null) {
            // 사용자를 찾지 못한 경우 빈 리스트 반환하거나 예외 처리
            return Collections.emptyList();
        }

        List<ScholarshipScrap> scholarshipScraps = scrapRepository.findByUser(user);
        List<ScholarshipDTO> scrapScholarshipsWithKeywords = scholarshipScraps.stream()
                .map(scholarshipScrap -> {
                    Scholarship scholarship = scholarshipScrap.getScholarship();
                    List<ScholarshipTag> tagIdsByScholarshipId = scholarshipTagRepository.findByScholarshipId(scholarship.getId());
                    List<String> keywords = tagIdsByScholarshipId.stream()
                            .map(scholarshipTag -> scholarshipTag.getTag().getName())
                            .collect(Collectors.toList());

                    ScholarshipDTO scholarshipDTO = convertToScholarshipDTO(scholarship);
                    scholarshipDTO.setKeywords(keywords);
                    return scholarshipDTO;
                })
                .collect(Collectors.toList());

        return scrapScholarshipsWithKeywords;
    }

    private ScholarshipDTO convertToScholarshipDTO(Scholarship scholarship) {
        ScholarshipDTO dto = new ScholarshipDTO();
        dto.setId(scholarship.getId());
        dto.setTitle(scholarship.getTitle());
        dto.setDepartment(scholarship.getDepartment());
        dto.setViewCount(scholarship.getViewCount());
        dto.setApplyStartAt(scholarship.getApplyStartAt());
        dto.setApplyEndAt(scholarship.getApplyEndAt());
        dto.setNumSelection(scholarship.getNumSelection());
        dto.setBenefit(scholarship.getBenefit());
        dto.setApplyMethod(scholarship.getApplyMethod());
        dto.setTarget(scholarship.getTarget());
        dto.setContact(scholarship.getContact());
        dto.setOriginUrl(scholarship.getOriginUrl());

        return dto;
    }

    public List<Scholarship> getScrapScholarships(String username) {

        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null) {
            // 사용자를 찾지 못한 경우 빈 리스트 반환하거나 예외 처리
            return Collections.emptyList();
        }
        List<ScholarshipScrap> scholarshipScraps = scrapRepository.findByUser(user);
        List<Scholarship> scrapScholarships = scholarshipScraps.stream()
                .map(ScholarshipScrap::getScholarship)
                .collect(Collectors.toList());

        return scrapScholarships;
    }
    @Transactional
    public void setScrapScholarships(String username, Long id) {
        User user = userRepository.findByUsername(username).orElse(null);
        Scholarship scholarship = (Scholarship) scholarshipRepository.findById(id).orElse(null);


        if (user == null || scholarship == null) {
            //log.info("----------장학금 존재안함");
            // 사용자 또는 장학금 정보를 찾을 수 없을 경우 예외 처리 또는 반환
            return;
        }

        ScholarshipScrap existingScrap = scrapRepository.findByUserAndScholarship(user, scholarship);
        if (existingScrap != null) {
            //log.info("----------장학금 스크랩 해제");
            // 이미 스크랩된 상태라면 스크랩 해제
            scrapRepository.delete(existingScrap);
        } else {
            // 스크랩하지 않은 상태라면 스크랩 추가
            ScholarshipScrap newScrap = new ScholarshipScrap();

            newScrap.setUser(user);
            newScrap.setScholarship(scholarship);
            scrapRepository.save(newScrap);
        }
    }
}
