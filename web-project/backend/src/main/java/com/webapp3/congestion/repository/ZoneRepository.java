package com.webapp3.congestion.repository;

import com.webapp3.congestion.domain.Zone;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ZoneRepository extends JpaRepository<Zone, Long> {
}
