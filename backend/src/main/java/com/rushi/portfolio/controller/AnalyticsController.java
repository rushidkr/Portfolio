package com.rushi.portfolio.controller;

import com.rushi.portfolio.dto.ApiResponse;
import com.rushi.portfolio.model.VisitorLog;
import com.rushi.portfolio.repository.VisitorLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final VisitorLogRepository visitorLogRepository;

    @Value("${portfolio.admin-key:}")
    private String adminKey;

    @PostMapping("/track")
    public ResponseEntity<ApiResponse> trackVisit(
            @RequestParam(value = "isResume", defaultValue = "false") boolean isResume) {

        VisitorLog log = new VisitorLog();
        log.setResumeDownload(isResume);

        // Process saving asynchronously in a background thread to prevent blocking
        java.util.concurrent.CompletableFuture.runAsync(() -> {
            try {
                visitorLogRepository.save(log);
            } catch (Exception e) {
                System.err.println("Failed to save visitor log: " + e.getMessage());
            }
        });

        return ResponseEntity.ok(ApiResponse.ok("Tracked successfully"));
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats(
            @RequestHeader(value = "X-Admin-Key", required = false) String providedKey) {

        if (adminKey.isBlank() || providedKey == null || !adminKey.equals(providedKey)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Missing or invalid admin key");
        }

        List<VisitorLog> logs = visitorLogRepository.findAllByOrderByCreatedAtDesc();
        long totalPageViews = logs.stream().filter(l -> !l.isResumeDownload()).count();
        long totalResumeDownloads = logs.stream().filter(VisitorLog::isResumeDownload).count();

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalPageViews", totalPageViews);
        stats.put("totalResumeDownloads", totalResumeDownloads);
        stats.put("logs", logs);

        return ResponseEntity.ok(stats);
    }
}
