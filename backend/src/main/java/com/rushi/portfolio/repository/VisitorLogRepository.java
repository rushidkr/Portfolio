package com.rushi.portfolio.repository;

import com.rushi.portfolio.model.VisitorLog;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface VisitorLogRepository extends JpaRepository<VisitorLog, Long> {
    List<VisitorLog> findAllByOrderByCreatedAtDesc();
}
