package com.webapp3.congestion.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ReportHistoryItem {
    private Long   reportId;
    private String zoneName;
    private String level;    // "LOW" | "MEDIUM" | "HIGH"
    private String label;    // "여유" | "보통" | "혼잡"
    private String reportedAt; // "6월 14일 12:30"
}
