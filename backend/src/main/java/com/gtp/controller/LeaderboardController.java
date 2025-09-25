package com.gtp.controller;

import com.gtp.model.LeaderboardEntry;
import com.gtp.repo.LeaderboardRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leaderboard")
public class LeaderboardController {
    private final LeaderboardRepository repo;

    public LeaderboardController(LeaderboardRepository repo) { this.repo = repo; }

    @GetMapping
    public ResponseEntity<List<LeaderboardEntry>> list() { return ResponseEntity.ok(repo.findAll()); }

    @PostMapping
    public ResponseEntity<LeaderboardEntry> create(@RequestBody LeaderboardEntry e) { return ResponseEntity.ok(repo.save(e)); }
}


