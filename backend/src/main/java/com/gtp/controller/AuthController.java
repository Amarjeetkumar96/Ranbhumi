package com.gtp.controller;

import com.gtp.model.User;
import com.gtp.service.AuthService;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

record RegisterRequest(@NotBlank String name, @Email String email, @NotBlank String password, @NotBlank String role) {}
record LoginRequest(@Email String email, @NotBlank String password) {}
record UserResponse(Long id, String name, String email, String role) {}

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService auth;
    public AuthController(AuthService auth) { this.auth = auth; }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@RequestBody RegisterRequest req) {
        User u = auth.register(req.name(), req.email(), req.password(), req.role());
        return ResponseEntity.ok(new UserResponse(u.getId(), u.getName(), u.getEmail(), u.getRole()));
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponse> login(@RequestBody LoginRequest req) {
        User u = auth.login(req.email(), req.password());
        return ResponseEntity.ok(new UserResponse(u.getId(), u.getName(), u.getEmail(), u.getRole()));
    }
}


