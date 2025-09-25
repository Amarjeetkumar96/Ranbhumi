package com.gtp.service;

import com.gtp.model.Tournament;
import com.gtp.repo.RegistrationRepository;
import com.gtp.repo.TournamentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TournamentService {
    private final TournamentRepository tournaments;
    private final RegistrationRepository registrations;

    public TournamentService(TournamentRepository tournaments, RegistrationRepository registrations) {
        this.tournaments = tournaments;
        this.registrations = registrations;
    }

    public List<Tournament> list() { return tournaments.findAll(); }
    public Tournament create(Tournament t) { return tournaments.save(t); }
    public Tournament get(Long id) { return tournaments.findById(id).orElseThrow(); }
    public Tournament update(Long id, Tournament updatedTournament) {
        Tournament existing = tournaments.findById(id).orElseThrow();
        existing.setName(updatedTournament.getName());
        existing.setGame(updatedTournament.getGame());
        existing.setDate(updatedTournament.getDate());
        existing.setRegistrationDeadline(updatedTournament.getRegistrationDeadline());
        existing.setDescription(updatedTournament.getDescription());
        existing.setPaid(updatedTournament.isPaid());
        existing.setFee(updatedTournament.getFee());
        return tournaments.save(existing);
    }
    public void delete(Long id) { 
        Tournament tournament = tournaments.findById(id).orElseThrow();
        // Delete related registrations first
        registrations.deleteByTournament(tournament);
        // Then delete the tournament
        tournaments.deleteById(id); 
    }
}


