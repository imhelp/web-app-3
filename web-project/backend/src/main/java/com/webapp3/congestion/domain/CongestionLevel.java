package com.webapp3.congestion.domain;

// 여유=1점, 보통=2점, 혼잡=3점 / fromScore()로 평균 점수→등급 변환
public enum CongestionLevel {
    LOW("여유", 1),
    MEDIUM("보통", 2),
    HIGH("혼잡", 3),
    UNKNOWN("정보 없음", 0);

    private final String label;
    private final int score;

    CongestionLevel(String label, int score) {
        this.label = label;
        this.score = score;
    }

    public String getLabel() { return label; }
    public int getScore()    { return score; }

    // 1.0~1.49 → LOW, 1.5~2.49 → MEDIUM, 2.5+ → HIGH
    public static CongestionLevel fromScore(double averageScore) {
        if (averageScore <= 0) return UNKNOWN;
        if (averageScore < 1.5) return LOW;
        if (averageScore < 2.5) return MEDIUM;
        return HIGH;
    }
}
