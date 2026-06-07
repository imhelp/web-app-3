package com.webapp3.congestion.controller;

import com.webapp3.congestion.dto.LoginRequest;
import com.webapp3.congestion.entity.User;
import com.webapp3.congestion.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class UserController {

        @Autowired
        private UserRepository userRepository;

        @PostMapping("/login")
        public Map<String, Boolean> login(
                        @RequestBody LoginRequest request) {

                User user = userRepository.findByStudentIdAndPassword(
                                request.getStudentId(),
                                request.getPassword());

                return Map.of(
                                "success",
                                user != null);
        }
}