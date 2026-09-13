package threatassesment.javabackend.dto;

import java.util.List;

/**
 * Aggregated dashboard payload consumed by the frontend.
 */
public record DashboardSummary(
        List<CityRiskProfile> cities,
        List<TierInfo> tiers) {
}