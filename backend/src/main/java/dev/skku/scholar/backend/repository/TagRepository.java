package dev.skku.scholar.backend.repository;

import dev.skku.scholar.backend.domain.ScholarshipTag;
import dev.skku.scholar.backend.domain.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
    Tag findByName(String name);

//    List<Tag> findTagsBySemesterRange(int semester);
}