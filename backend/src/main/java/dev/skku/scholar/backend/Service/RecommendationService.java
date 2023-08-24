package dev.skku.scholar.backend.Service;

import dev.skku.scholar.backend.domain.ScholarshipTag;
import dev.skku.scholar.backend.domain.Tag;
import dev.skku.scholar.backend.domain.User;
import dev.skku.scholar.backend.repository.ScholarshipTagRepository;
import dev.skku.scholar.backend.repository.TagRepository;
import dev.skku.scholar.backend.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RecommendationService {

    private final UserRepo userRepository;
    private final TagRepository tagRepository;
    private final ScholarshipTagRepository scholarshipTagRepository;

    @Autowired
    public RecommendationService(UserRepo userRepository, TagRepository tagRepository, ScholarshipTagRepository scholarshipTagRepository) {
        this.userRepository = userRepository;
        this.tagRepository = tagRepository;
        this.scholarshipTagRepository = scholarshipTagRepository;
    }

    public List<Long> getRecommendedScholarships(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        if (!user.isPresent()) {
            throw new RuntimeException("User not found");
        }

        List<Long> recommendedScholarships = new ArrayList<>();

        recommendedScholarships.addAll(getScholarshipIdsForTagBasedOnGpa(user.get()));
        recommendedScholarships.addAll(getScholarshipIdsForTagBasedOnLastSemGpa(user.get()));
        recommendedScholarships.addAll(getScholarshipIdsForTagBasedOnMajor(user.get()));
        System.out.println(getScholarshipIdsForTagBasedOnMajor(user.get()));
//        recommendedScholarships.addAll(getScholarshipIdsForTagBasedOnSemester(user.get()));

        return recommendedScholarships;
    }

    private List<Long> getScholarshipIdsForTagBasedOnGpa(User user) {
        Double gpa = Double.valueOf(user.getGpa());
        String tagName = "평점평균 " + Math.min(4, (int) Math.floor(gpa));
        System.out.println(tagName);
        Tag tag = tagRepository.findByName(tagName);
        System.out.println(tag);
        return tag != null ? getScholarshipIdsForTag(tag.getId()) : new ArrayList<>();
    }

    private List<Long> getScholarshipIdsForTagBasedOnLastSemGpa(User user) {
        Double gpa = Double.valueOf(user.getLastSemGpa());
        String tagName = "직전학기 성적 " + Math.min(4, (int) Math.floor(gpa));
        Tag tag = tagRepository.findByName(tagName);
        System.out.println(tag);
        return tag != null ? getScholarshipIdsForTag(tag.getId()) : new ArrayList<>();
    }

    private List<Long> getScholarshipIdsForTagBasedOnMajor(User user) {
        String major = user.getMajor();
        Tag tag = tagRepository.findByName(major);
        System.out.println(tag);
        return tag != null ? getScholarshipIdsForTag(tag.getId()) : new ArrayList<>();
    }

//    private List<Long> getScholarshipIdsForTagBasedOnSemester(User user) {
//        int semester = user.getSemester();
//        List<Tag> semesterTags = tagRepository.findTagsBySemesterRange(semester);
//        List<Long> scholarshipIds = new ArrayList<>();
//        for (Tag semesterTag : semesterTags) {
//            scholarshipIds.addAll(getScholarshipIdsForTag(semesterTag.getId()));
//        }
//        return scholarshipIds;
//    }

    private List<Long> getScholarshipIdsForTag(Long tagId) {
        List<Long> scholarshipIds = new ArrayList<>();
        List<ScholarshipTag> scholarshipTags = scholarshipTagRepository.findByTagId(tagId);
        for (ScholarshipTag scholarshipTag : scholarshipTags) {
            scholarshipIds.add(scholarshipTag.getScholarship().getId());
        }
        return scholarshipIds;
    }
}
