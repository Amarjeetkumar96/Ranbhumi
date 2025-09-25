package com.gtp.controller;

import com.gtp.model.Tournament;
import com.gtp.service.TournamentService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tournaments")
public class TournamentController {
    private final TournamentService tournaments;
    public TournamentController(TournamentService tournaments) { this.tournaments = tournaments; }

    @GetMapping
    public ResponseEntity<List<Tournament>> list() { return ResponseEntity.ok(tournaments.list()); }

    @PostMapping
    public ResponseEntity<Tournament> create(@Valid @RequestBody Tournament body) {
        return ResponseEntity.ok(tournaments.create(body));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tournament> get(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(tournaments.get(id));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tournament> update(@PathVariable Long id, @Valid @RequestBody Tournament body) {
        try {
            return ResponseEntity.ok(tournaments.update(id, body));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        try {
            tournaments.delete(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}


