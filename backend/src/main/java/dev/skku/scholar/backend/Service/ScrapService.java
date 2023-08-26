package dev.skku.scholar.backend.Service;

import dev.skku.scholar.backend.domain.Scholarship;
import dev.skku.scholar.backend.domain.ScholarshipScrap;
import dev.skku.scholar.backend.domain.User;
import dev.skku.scholar.backend.repository.ScholarshipRepository;
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
