package dev.skku.scholar.backend.Service;

import dev.skku.scholar.backend.domain.Scholarship;
import dev.skku.scholar.backend.repository.ScholarshipRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ScholarshipService {
    private final ScholarshipRepo scholarshipRepo;
    public List<Scholarship> findScholarships() {
        return scholarshipRepo.findAll();
    }

    public Scholarship findScholarshipById(Long id) {
        return (Scholarship) scholarshipRepo.findById(id).orElse(null);
    }
}