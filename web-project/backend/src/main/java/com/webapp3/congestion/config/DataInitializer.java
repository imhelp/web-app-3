package com.webapp3.congestion.config;

import com.webapp3.congestion.domain.Zone;
import com.webapp3.congestion.repository.CongestionReportRepository;
import com.webapp3.congestion.repository.ZoneRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final ZoneRepository zoneRepository;
    private final CongestionReportRepository congestionReportRepository;

    private static final Set<String> CORRECT_ZONES = Set.of(
        "공대식당 1층", "공대식당 2층",
        "구 바우어관 지하 1층", "신 바우어관 2층", "아람관 3층"
    );

    @Override
    public void run(String... args) {
        List<Zone> existing = zoneRepository.findAll();
        if (!existing.isEmpty()) {
            boolean alreadyCorrect = existing.stream()
                .allMatch(z -> CORRECT_ZONES.contains(z.getName()));
            if (alreadyCorrect) return;
            // 구 테스트 데이터 교체 (제보 → 구역 순서로 삭제)
            congestionReportRepository.deleteAll();
            zoneRepository.deleteAll();
        }

        zoneRepository.save(new Zone("공대식당 1층"));
        zoneRepository.save(new Zone("공대식당 2층"));
        zoneRepository.save(new Zone("구 바우어관 지하 1층"));
        zoneRepository.save(new Zone("신 바우어관 2층"));
        zoneRepository.save(new Zone("아람관 3층"));
    }
}
