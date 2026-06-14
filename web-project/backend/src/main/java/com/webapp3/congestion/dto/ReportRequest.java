package com.webapp3.congestion.dto;

import com.webapp3.congestion.domain.CongestionLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 클라이언트가 혼잡도를 제보할 때 보내는 요청 본문.
 * 예: { "level": "HIGH" }
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReportRequest {
    private CongestionLevel level;
    private String studentId; // optional (null 허용)
}
