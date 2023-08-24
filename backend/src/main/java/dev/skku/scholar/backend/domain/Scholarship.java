package dev.skku.scholar.backend.domain;
import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "scholarship")
public class Scholarship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String department;

    @Column(nullable = false)
    private Integer viewCount;

    @Column(name = "apply_start_at", nullable = false)
    private LocalDateTime applyStartAt;

    @Column(name = "apply_end_at", nullable = false)
    private LocalDateTime applyEndAt;

    @Column(nullable = false)
    private String numSelection;

    @Column(nullable = false)
    private String benefit;

    @Column(nullable = false)
    private String applyMethod;

    @Column(nullable = false)
    private String target;

    @Column(nullable = false)
    private String contact;

    @Column(name = "origin_url", nullable = false)
    private String originUrl;

}
