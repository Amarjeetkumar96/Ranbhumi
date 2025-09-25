package com.gtp.service;

import com.gtp.model.Registration;
import com.gtp.model.Tournament;
import com.gtp.model.User;
import com.gtp.repo.RegistrationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegistrationService {
    private final RegistrationRepository registrations;

    public RegistrationService(RegistrationRepository registrations) {
        this.registrations = registrations;
    }

    public Registration join(User user, Tournament tournament) {
        return registrations.findByUserAndTournament(user, tournament)
                .orElseGet(() -> {
                    Registration r = new Registration();
                    r.setUser(user);
                    r.setTournament(tournament);
                    return registrations.save(r);
                });
    }

    public List<Registration> listForUser(User user) {
        return registrations.findAllByUser(user);
    }
}


