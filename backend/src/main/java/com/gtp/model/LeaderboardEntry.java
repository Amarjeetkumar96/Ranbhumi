package com.gtp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "leaderboard")
public class LeaderboardEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String team;
    private int points;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTeam() { return team; }
    public void setTeam(String team) { this.team = team; }
    public int getPoints() { return points; }
    public void setPoints(int points) { this.points = points; }
}


