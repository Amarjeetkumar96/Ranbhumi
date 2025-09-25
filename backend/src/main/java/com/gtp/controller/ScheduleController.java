package com.gtp.controller;

import com.gtp.model.MatchSchedule;
import com.gtp.repo.MatchScheduleRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schedule")
public class ScheduleController {
    private final MatchScheduleRepository repo;

    public ScheduleController(MatchScheduleRepository repo) { this.repo = repo; }

    @GetMapping
    public ResponseEntity<List<MatchSchedule>> list() { return ResponseEntity.ok(repo.findAll()); }

    @PostMapping
    public ResponseEntity<MatchSchedule> create(@RequestBody MatchSchedule m) { return ResponseEntity.ok(repo.save(m)); }
}


