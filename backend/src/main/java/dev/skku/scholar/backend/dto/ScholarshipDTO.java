package dev.skku.scholar.backend.dto;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class ScholarshipDTO {
    private Long id;
    private String title;
    private String department;
    private Integer viewCount;
    private LocalDateTime applyStartAt;
    private LocalDateTime applyEndAt;
    private String numSelection;
    private String benefit;
    private String applyMethod;
    private String target;
    private String contact;
    private String originUrl;
    private List<String> keywords;
}
