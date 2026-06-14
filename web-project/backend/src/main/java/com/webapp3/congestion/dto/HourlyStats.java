package com.webapp3.congestion.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class HourlyStats {
    private int hour;
    private long low;
    private long medium;
    private long high;
}
