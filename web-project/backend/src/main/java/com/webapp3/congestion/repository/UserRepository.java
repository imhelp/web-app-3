package com.webapp3.congestion.repository;

import com.webapp3.congestion.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository
        extends JpaRepository<User, Long> {

    User findByStudentIdAndPassword(
            String studentId,
            String password
    );

    User findByStudentId(String studentId);
}