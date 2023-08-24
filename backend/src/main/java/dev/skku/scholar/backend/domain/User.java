package dev.skku.scholar.backend.domain;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "user")
@NoArgsConstructor
public class User{
    @Builder
    public User(String username, String password, String email, ESex sex, LocalDateTime birth,
                String major, Integer semester, EEnrollment enrollStatus,
                Integer gpa, Integer lastSemGpa, Integer incomeBracket, String residence) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.sex = sex;
        this.birth = birth;
        this.major = major;
        this.semester = semester;
        this.enrollStatus = enrollStatus;
        this.gpa = gpa;
        this.lastSemGpa = lastSemGpa;
        this.incomeBracket = incomeBracket;
        this.residence = residence;
    }


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ESex sex;

    @Column(nullable = false)
    private LocalDateTime birth;

    private String major;

    private Integer semester;
    private Integer incomeBracket;
    private Integer gpa;
    private Integer lastSemGpa;
    private String residence;

    @Enumerated(EnumType.STRING)
    private EEnrollment enrollStatus;


}