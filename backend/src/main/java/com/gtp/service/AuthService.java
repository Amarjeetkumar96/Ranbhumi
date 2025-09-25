package com.gtp.service;

import com.gtp.model.User;
import com.gtp.repo.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository users;

    public AuthService(UserRepository users) {
        this.users = users;
    }

    public User register(String name, String email, String password, String role) {
        users.findByEmail(email).ifPresent(u -> { throw new IllegalArgumentException("Email already registered"); });
        User u = new User();
        u.setName(name);
        u.setEmail(email);
        u.setPassword(password); // NOTE: demo only; hash in production
        u.setRole("admin".equalsIgnoreCase(role) ? "admin" : "user");
        return users.save(u);
    }

    public User login(String email, String password) {
        return users.findByEmail(email)
                .filter(u -> u.getPassword().equals(password))
                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));
    }
}


