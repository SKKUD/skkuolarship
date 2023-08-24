package dev.skku.scholar.backend.domain;
import jakarta.persistence.*;


@Entity
@Table(name = "scholarship_scrap")
public class ScholarshipScrap {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "scholarship_id", nullable = false)
    private Scholarship scholarship;

    // Getters and setters
}
