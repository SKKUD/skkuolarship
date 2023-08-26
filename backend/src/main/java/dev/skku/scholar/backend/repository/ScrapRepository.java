package dev.skku.scholar.backend.repository;

import dev.skku.scholar.backend.domain.Scholarship;
import dev.skku.scholar.backend.domain.ScholarshipScrap;
import dev.skku.scholar.backend.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScrapRepository extends JpaRepository<ScholarshipScrap, Long> {

    List<ScholarshipScrap> findByUser(User user);

    ScholarshipScrap findByUserAndScholarship(User user, Scholarship scholarship);
}
