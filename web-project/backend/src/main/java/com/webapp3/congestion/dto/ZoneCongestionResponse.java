package com.webapp3.congestion.dto;

import com.webapp3.congestion.domain.CongestionLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ZoneCongestionResponse {
    private Long zoneId;
    private String zoneName;
    private CongestionLevel level;
    private String label;
    private int reportCount;
    private Long lastReportedSecondsAgo; // null 이면 최근 20분 이내 제보 없음

    public static ZoneCongestionResponse of(
            Long zoneId, String zoneName, CongestionLevel level,
            int reportCount, Long lastReportedSecondsAgo) {
        return new ZoneCongestionResponse(
                zoneId, zoneName, level, level.getLabel(), reportCount, lastReportedSecondsAgo);
    }
}
