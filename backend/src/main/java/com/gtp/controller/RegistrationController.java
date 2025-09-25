package com.gtp.controller;

import com.gtp.model.Registration;
import com.gtp.model.Tournament;
import com.gtp.model.User;
import com.gtp.repo.TournamentRepository;
import com.gtp.repo.UserRepository;
import com.gtp.service.RegistrationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

record JoinRequest(Long userId, Long tournamentId) {}

@RestController
@RequestMapping("/api/registrations")
public class RegistrationController {
    private final RegistrationService registrations;
    private final UserRepository users;
    private final TournamentRepository tournaments;

    public RegistrationController(RegistrationService registrations, UserRepository users, TournamentRepository tournaments) {
        this.registrations = registrations;
        this.users = users;
        this.tournaments = tournaments;
    }

    @PostMapping("/join")
    public ResponseEntity<Registration> join(@RequestBody JoinRequest req) {
        User user = users.findById(req.userId()).orElseThrow();
        Tournament t = tournaments.findById(req.tournamentId()).orElseThrow();
        return ResponseEntity.ok(registrations.join(user, t));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Registration>> listForUser(@PathVariable Long userId) {
        User user = users.findById(userId).orElseThrow();
        return ResponseEntity.ok(registrations.listForUser(user));
    }
}


