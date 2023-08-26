package dev.skku.scholar.backend.repository;

import dev.skku.scholar.backend.domain.ScholarshipTag;
import dev.skku.scholar.backend.domain.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScholarshipTagRepository extends JpaRepository<ScholarshipTag, Long> {
    List<ScholarshipTag> findByTagId(Long tagId);

    List<ScholarshipTag> findByScholarshipId(Long scholarshipId);
}
