package dev.skku.scholar.backend.repository;

import dev.skku.scholar.backend.domain.Scholarship;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Repository;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;


@Repository
@RequiredArgsConstructor
public class ScholarshipRepo {

    private final EntityManager em;
    public List<Scholarship> findAll() {
        return em.createQuery("select i from Scholarship i", Scholarship.class).getResultList();
    }

    public Optional<Object> findById(Long id) {
        return Optional.ofNullable(em.find(Scholarship.class, id));
    }

}