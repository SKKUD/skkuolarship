package dev.skku.scholar.backend.Service;

import dev.skku.scholar.backend.domain.Scholarship;
import dev.skku.scholar.backend.domain.ScholarshipTag;
import dev.skku.scholar.backend.domain.Tag;
import dev.skku.scholar.backend.repository.ScholarshipRepository;
import dev.skku.scholar.backend.repository.ScholarshipTagRepository;
import dev.skku.scholar.backend.repository.TagRepository;
import dev.skku.scholar.backend.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ScholarshipService {
    private final ScholarshipRepository scholarshipRepository;
    private final ScholarshipTagRepository scholarshipTagRepository;
    private final TagRepository tagRepository;

    @Autowired
    public ScholarshipService(ScholarshipTagRepository scholarshipTagRepository, ScholarshipRepository scholarshipRepository, TagRepository tagRepository) {
        this.scholarshipRepository = scholarshipRepository;
        this.scholarshipTagRepository = scholarshipTagRepository;
        this.tagRepository = tagRepository;
    }

    public Map<Scholarship, List<String>> scholarshipWithKeywords(){
        Map<Scholarship, List<String>> scholarshipAndKeywords = new HashMap<>();
        List<Scholarship> scholarships = (List<Scholarship>) scholarshipRepository.findAll();

        for (Scholarship scholarship : scholarships) {
            System.out.print("Scholarship ID야!!!!"+scholarship.getId());
            List<ScholarshipTag> tagIdsByScholarshipId = scholarshipTagRepository.findByScholarshipId(scholarship.getId());
            List<String> keywordsList = new ArrayList<>();
            for (ScholarshipTag scholarshipTag : tagIdsByScholarshipId) {
                String keywords = scholarshipTag.getTag().getName();
                System.out.println("keywords야!!!!"+keywords);
                keywordsList.add(keywords);
            }
            scholarshipAndKeywords.put(scholarship, keywordsList);
        }
        return scholarshipAndKeywords;
    }
//    public List<Scholarship> findScholarshipsWithTags() {
//        List<Scholarship> scholarships = scholarshipRepo.findAll();
//        for (Scholarship scholarship : scholarships) {
//            List<Tag> tags = tagRepository.findTagsByScholarshipId(scholarship.getId());
//            scholarship.setTags(tags);
//            List<String> tagNames = tags.stream().map(Tag::getName).collect(Collectors.toList());
//            scholarship.setTagNames(tagNames);
//        }
//        return scholarships;
//    }
//
//    public Scholarship findScholarshipByIdWithTags(Long id) {
//        Scholarship scholarship = scholarshipRepo.findById(id).orElse(null);
//        if (scholarship != null) {
//            List<Tag> tags = tagRepository.findTagsByScholarshipId(scholarship.getId());
//            scholarship.setTags(tags);
//            List<String> tagNames = tags.stream().map(Tag::getName).collect(Collectors.toList());
//            scholarship.setTagNames(tagNames);
//        }
//        return scholarship;
//    }
//
//    public List<Scholarship> findScholarshipsByIds(List<Long> scholarshipIds) {
//        return scholarshipRepo.findByIdIn(scholarshipIds);
//    }

//    public List<Long> getScholarshipIdsByUserMajorAndSemester(String major, int semester) {
//        List<Long> scholarshipIds = new ArrayList<>();
//        Tag tag = tagRepository.findByName(major); // Find tag by major name
//        if (tag != null) {
//            if (semester >= 1 && semester <= 2) {
//                scholarshipIds.addAll(tag.getScholarshipIdsForSemester1And2());
//            } else if (semester >= 3 && semester <= 4) {
//                scholarshipIds.addAll(tag.getScholarshipIdsForSemester3And4());
//            } else if (semester >= 5 && semester <= 6) {
//                scholarshipIds.addAll(tag.getScholarshipIdsForSemester5And6());
//            } else if (semester >= 7 && semester <= 8) {
//                scholarshipIds.addAll(tag.getScholarshipIdsForSemester7And8());
//            }
//        }
//        return scholarshipIds;
//    }
}