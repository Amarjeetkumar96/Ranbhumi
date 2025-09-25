package com.gtp.repo;

import com.gtp.model.LeaderboardEntry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeaderboardRepository extends JpaRepository<LeaderboardEntry, Long> {}


