package dev.skku.scholar.backend.repository;

import dev.skku.scholar.backend.domain.Scholarship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScholarshipRepository extends JpaRepository<Scholarship, Long> {
    List<Scholarship> findByIdIn(List<Long> scholarshipIds);
}
