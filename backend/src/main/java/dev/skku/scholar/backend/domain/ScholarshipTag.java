package dev.skku.scholar.backend.domain;
import jakarta.persistence.*;
@Entity
@Table(name = "scholarship_tag")
public class ScholarshipTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "scholarship_id", nullable = false)
    private Scholarship scholarship;

    @ManyToOne
    @JoinColumn(name = "tag_id", nullable = false)
    private Tag tag;

    // Getters and setters
}
