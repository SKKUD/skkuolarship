package dev.skku.scholar.backend.Service;

import dev.skku.scholar.backend.domain.Scholarship;
import dev.skku.scholar.backend.domain.ScholarshipTag;
import dev.skku.scholar.backend.domain.Tag;
import dev.skku.scholar.backend.domain.User;
import dev.skku.scholar.backend.repository.ScholarshipRepo;
import dev.skku.scholar.backend.repository.ScholarshipTagRepository;
import dev.skku.scholar.backend.repository.TagRepository;
import dev.skku.scholar.backend.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RecommendationService {

    private final UserRepo userRepository;
    private final TagRepository tagRepository;
    private final ScholarshipTagRepository scholarshipTagRepository;
    private final ScholarshipRepo scholarshipRepo;

    @Autowired
    public RecommendationService(UserRepo userRepository, TagRepository tagRepository, ScholarshipTagRepository scholarshipTagRepository, ScholarshipRepo scholarshipRepo) {
        this.userRepository = userRepository;
        this.tagRepository = tagRepository;
        this.scholarshipTagRepository = scholarshipTagRepository;
        this.scholarshipRepo = scholarshipRepo;
    }

//    public List<Long> getRecommendedScholarships(String username) {
//        Optional<User> user = userRepository.findByUsername(username);
//        if (!user.isPresent()) {
//            throw new RuntimeException("User not found");
//        }
//
//        List<Long> recommendedScholarships = new ArrayList<>();
//
//        recommendedScholarships.addAll(getScholarshipIdsForTagBasedOnGpa(user.get()));
//        recommendedScholarships.addAll(getScholarshipIdsForTagBasedOnLastSemGpa(user.get()));
//        recommendedScholarships.addAll(getScholarshipIdsForTagBasedOnMajor(user.get()));
////        System.out.println(getScholarshipIdsForTagBasedOnMajor(user.get()));
////        recommendedScholarships.addAll(getScholarshipIdsForTagBasedOnSemester(user.get()));
//        return recommendedScholarships;
//    }
    public List<Scholarship> getRecommendedScholarships(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        if (!user.isPresent()) {
            throw new RuntimeException("User not found");
        }

        List<Long> recommendedScholarshipIds = new ArrayList<>();
        recommendedScholarshipIds.addAll(getScholarshipIdsForTagBasedOnGpa(user.get()));
        recommendedScholarshipIds.addAll(getScholarshipIdsForTagBasedOnLastSemGpa(user.get()));
        recommendedScholarshipIds.addAll(getScholarshipIdsForTagBasedOnMajor(user.get()));
        //recommendedScholarshipIds.addAll(getScholarshipIdsForTagBasedOnSemester(user.get()));

        return scholarshipRepo.findByIdIn(recommendedScholarshipIds);
    }

    private Map<Long, Scholarship> getScholarshipInfoForTag(List<Long> scholarshipIds) {
        Map<Long, Scholarship> scholarshipInfoMap = new HashMap<>();
        List<Scholarship> scholarships = scholarshipRepo.findByIdIn(scholarshipIds);

        for (Scholarship scholarship : scholarships) {
            scholarshipInfoMap.put(scholarship.getId(), scholarship);
        }
        return scholarshipInfoMap;
    }




    /*private List<Long> getScholarshipIdsForTagBasedOnGpa(User user) {
        Double gpa = Double.valueOf(user.getGpa());
        String tagName = "평점평균 " + Math.min(4, (int) Math.floor(gpa));
        Tag tag = tagRepository.findByName(tagName);
        System.out.println(tag.getId());
        System.out.println(getScholarshipIdsForTag(tag.getId()));

        return tag != null ? getScholarshipIdsForTag(tag.getId()) : new ArrayList<>();
    }*/
    private List<Long> getScholarshipIdsForTagBasedOnGpa(User user) {
        Double userGpa = Double.valueOf(user.getGpa());
        int gpa = Math.min(4, (int) Math.floor(userGpa));

        List<Long> scholarshipIds = new ArrayList<>();
        for (int i = 2; i <= gpa; i++) {
            String tagName = "평점평균 " + i;
            Tag tag = tagRepository.findByName(tagName);
            if (tag != null) {
                scholarshipIds.addAll(getScholarshipIdsForTag(tag.getId()));
            }
        }
        return scholarshipIds;
    }

    /*private List<Long> getScholarshipIdsForTagBasedOnLastSemGpa(User user) {
        Double gpa = Double.valueOf(user.getLastSemGpa());
        String tagName = "직전학기 성적 " + Math.min(4, (int) Math.floor(gpa));
        Tag tag = tagRepository.findByName(tagName);
        System.out.println(tag);
        return tag != null ? getScholarshipIdsForTag(tag.getId()) : new ArrayList<>();
    }*/
    private List<Long> getScholarshipIdsForTagBasedOnLastSemGpa(User user) {
        Double userGpa = Double.valueOf(user.getLastSemGpa());
        int gpa = Math.min(4, (int) Math.floor(userGpa));

        List<Long> scholarshipIds = new ArrayList<>();
        for (int i = 2; i <= gpa; i++) {
            String tagName = "직전학기 " + i;
            Tag tag = tagRepository.findByName(tagName);
            if (tag != null) {
                scholarshipIds.addAll(getScholarshipIdsForTag(tag.getId()));
            }
        }

        return scholarshipIds;
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
        //System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        List<Long> scholarshipIds = new ArrayList<>();
        //System.out.println("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
        List<ScholarshipTag> scholarshipTags = scholarshipTagRepository.findByTagId(tagId);
        //System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        for (ScholarshipTag scholarshipTag : scholarshipTags) {
            //System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
            System.out.println(scholarshipTag.getScholarship().getId());
           // System.out.println("#############################");

            scholarshipIds.add(scholarshipTag.getScholarship().getId());
        }
        return scholarshipIds;
    }
}
