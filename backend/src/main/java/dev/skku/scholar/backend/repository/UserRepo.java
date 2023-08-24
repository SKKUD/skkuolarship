package dev.skku.scholar.backend.repository;

import dev.skku.scholar.backend.domain.User;
import jakarta.persistence.EntityManager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import lombok.RequiredArgsConstructor;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;


@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    boolean existsByUsername(String username);
    Optional<User> findByUsername(String username);
    /*private final EntityManager em;
    public void save(User user) {
        if(user.getId() == null) {
            em.persist(user);
        } else {
            em.merge(user); //similar to update
        }
    }
    public Optional<User> findByUsername(String username) {
        User user = em.createQuery("SELECT u FROM User u WHERE u.username = :username", User.class)
                .setParameter("username", username)
                .getResultList()
                .stream()
                .findFirst()
                .orElse(null);

        return Optional.ofNullable(user);
    }

    public User findOne(Long id) {
        return em.find(User.class, id);
    }*/

}