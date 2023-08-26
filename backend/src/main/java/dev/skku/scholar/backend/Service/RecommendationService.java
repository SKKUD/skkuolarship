package dev.skku.scholar.backend.Service;

import dev.skku.scholar.backend.domain.Scholarship;
import dev.skku.scholar.backend.domain.ScholarshipTag;
import dev.skku.scholar.backend.domain.Tag;
import dev.skku.scholar.backend.domain.User;
import dev.skku.scholar.backend.dto.ScholarshipDTO;
import dev.skku.scholar.backend.repository.ScholarshipRepository;
import dev.skku.scholar.backend.repository.ScholarshipTagRepository;
import dev.skku.scholar.backend.repository.TagRepository;
import dev.skku.scholar.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class RecommendationService {

    private final UserRepository userRepository;
    private final TagRepository tagRepository;
    private final ScholarshipTagRepository scholarshipTagRepository;
    private final ScholarshipRepository scholarshipRepository;

    @Autowired
    public RecommendationService(UserRepository userRepository, TagRepository tagRepository, ScholarshipTagRepository scholarshipTagRepository, ScholarshipRepository scholarshipRepository) {
        this.userRepository = userRepository;
        this.tagRepository = tagRepository;
        this.scholarshipTagRepository = scholarshipTagRepository;
        this.scholarshipRepository = scholarshipRepository;
    }


    public List<ScholarshipDTO> getRecommendedScholarshipsWithKeywords(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        if (!user.isPresent()) {
            throw new RuntimeException("User not found");
        }

        List<Long> recommendedScholarshipIds = new ArrayList<>();
        recommendedScholarshipIds.addAll(getScholarshipIdsForTagBasedOnGpa(user.get()));
        recommendedScholarshipIds.addAll(getScholarshipIdsForTagBasedOnLastSemGpa(user.get()));
        recommendedScholarshipIds.addAll(getScholarshipIdsForTagBasedOnMajor(user.get()));
        recommendedScholarshipIds.addAll(getScholarshipIdsForTagBasedOnSemester(user.get()));

        List<Scholarship> recommendedScholarships = scholarshipRepository.findByIdIn(recommendedScholarshipIds);

        Map<Long, List<String>> scholarshipKeywordsMap = new HashMap<>();
        for (Scholarship scholarship : recommendedScholarships) {
            List<ScholarshipTag> tagIdsByScholarshipId = scholarshipTagRepository.findByScholarshipId(scholarship.getId());
            List<String> keywordsList = tagIdsByScholarshipId.stream()
                    .map(scholarshipTag -> scholarshipTag.getTag().getName())
                    .collect(Collectors.toList());

            scholarshipKeywordsMap.put(scholarship.getId(), keywordsList);
        }

        return mapScholarshipsToDTOList(recommendedScholarships, scholarshipKeywordsMap);
    }

    private List<ScholarshipDTO> mapScholarshipsToDTOList(List<Scholarship> scholarships, Map<Long, List<String>> scholarshipKeywordsMap) {
        List<ScholarshipDTO> dtos = new ArrayList<>();

        for (Scholarship scholarship : scholarships) {
            List<String> keywords = scholarshipKeywordsMap.get(scholarship.getId());
            ScholarshipDTO dto = mapScholarshipToDTO(scholarship, keywords);
            dtos.add(dto);
        }

        return dtos;
    }

    private ScholarshipDTO mapScholarshipToDTO(Scholarship scholarship, List<String> keywords) {
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
        dto.setKeywords(keywords);
        return dto;
    }



    private Map<Long, Scholarship> getScholarshipInfoForTag(List<Long> scholarshipIds) {
        Map<Long, Scholarship> scholarshipInfoMap = new HashMap<>();
        List<Scholarship> scholarships = scholarshipRepository.findByIdIn(scholarshipIds);

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
            String tagName = "직전학기 성적 " + i;
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
    private List<Long> getScholarshipIdsForTagBasedOnSemester(User user) {
        int semester = (user.getSemester() + 1) / 2;
        Tag tag = tagRepository.findByName(semester + "학년");  // 예시 태그명: "학년 1", "학년 2", ...
        //System.out.println(tag);
        return tag != null ? getScholarshipIdsForTag(tag.getId()) : new ArrayList<>();
    }

}
