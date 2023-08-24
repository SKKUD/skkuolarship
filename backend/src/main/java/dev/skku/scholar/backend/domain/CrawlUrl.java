package dev.skku.scholar.backend.domain;



import jakarta.persistence.*;

@Entity
@Table(name = "crawl_url")
public class CrawlUrl {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String url;

    // Getters and setters
}
