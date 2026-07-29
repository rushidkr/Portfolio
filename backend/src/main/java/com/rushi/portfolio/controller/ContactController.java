package com.rushi.portfolio.controller;

import com.rushi.portfolio.dto.ApiResponse;
import com.rushi.portfolio.dto.ContactRequest;
import com.rushi.portfolio.model.ContactMessage;
import com.rushi.portfolio.repository.ContactMessageRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactMessageRepository contactMessageRepository;

    // Set ADMIN_API_KEY as an environment variable in your deployment.
    // Leave it unset locally and the admin endpoint stays disabled.
    @Value("${portfolio.admin-key:}")
    private String adminKey;

    @PostMapping
    public ResponseEntity<ApiResponse> submitMessage(@Valid @RequestBody ContactRequest request) {
        ContactMessage message = new ContactMessage();
        message.setName(request.getName());
        message.setEmail(request.getEmail());
        message.setMessage(request.getMessage());

        // Process saving asynchronously in a background thread to prevent blocking
        java.util.concurrent.CompletableFuture.runAsync(() -> {
            try {
                contactMessageRepository.save(message);
            } catch (Exception e) {
                System.err.println("Failed to save contact message: " + e.getMessage());
            }
        });

        return ResponseEntity
                .status(HttpStatus.ACCEPTED)
                .body(ApiResponse.ok("Thanks for reaching out! I'll get back to you soon."));
    }

    // Simple admin view so you can read submissions without opening a DB client.
    // Call with header: X-Admin-Key: <your ADMIN_API_KEY>
    @GetMapping
    public List<ContactMessage> listMessages(@RequestHeader(value = "X-Admin-Key", required = false) String providedKey) {
        if (adminKey.isBlank() || providedKey == null || !adminKey.equals(providedKey)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Missing or invalid admin key");
        }
        return contactMessageRepository.findAllByOrderByCreatedAtDesc();
    }
}
