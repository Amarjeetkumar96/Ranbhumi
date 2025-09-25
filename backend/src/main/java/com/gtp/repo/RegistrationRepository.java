package com.gtp.repo;

import com.gtp.model.Registration;
import com.gtp.model.Tournament;
import com.gtp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RegistrationRepository extends JpaRepository<Registration, Long> {
    Optional<Registration> findByUserAndTournament(User user, Tournament tournament);
    List<Registration> findAllByUser(User user);
    List<Registration> findAllByTournament(Tournament tournament);
    void deleteByTournament(Tournament tournament);
}


