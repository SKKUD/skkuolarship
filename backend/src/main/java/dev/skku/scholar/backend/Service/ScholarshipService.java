package dev.skku.scholar.backend.Service;

import dev.skku.scholar.backend.domain.Scholarship;
import dev.skku.scholar.backend.domain.Tag;
import dev.skku.scholar.backend.repository.ScholarshipRepo;
import dev.skku.scholar.backend.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ScholarshipService {
    private final ScholarshipRepo scholarshipRepo;
    private final TagRepository tagRepository;
    public List<Scholarship> findScholarships() {
        return scholarshipRepo.findAll();
    }

    public Scholarship findScholarshipById(Long id) {
        return (Scholarship) scholarshipRepo.findById(id).orElse(null);
    }

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