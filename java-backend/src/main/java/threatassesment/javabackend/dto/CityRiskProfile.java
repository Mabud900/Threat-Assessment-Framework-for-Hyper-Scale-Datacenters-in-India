package threatassesment.javabackend.dto;

import java.util.Map;

/**
 * City-level risk profile with per-tier scores.
 */
public record CityRiskProfile(
        String id,
        String name,
        String state,
        double lat,
        double lng,
        double csti,
        String tier,
        Map<String, Double> scores) {
}