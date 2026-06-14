package com.webapp3.congestion.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CongestionReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Zone zone;

    @Enumerated(EnumType.STRING)
    private CongestionLevel level;

    private LocalDateTime createdAt;

    private String studentId; // null = 비로그인 제보 (구 데이터 호환)

    public CongestionReport(Zone zone, CongestionLevel level, LocalDateTime createdAt, String studentId) {
        this.zone = zone;
        this.level = level;
        this.createdAt = createdAt;
        this.studentId = studentId;
    }
}
