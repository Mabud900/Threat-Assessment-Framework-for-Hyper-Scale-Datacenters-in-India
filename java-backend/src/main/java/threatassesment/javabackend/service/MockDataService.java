package threatassesment.javabackend.service;

import org.springframework.stereotype.Service;
import threatassesment.javabackend.dto.CityRiskProfile;
import threatassesment.javabackend.dto.TierInfo;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Static fallback data used when the upstream OpenData API is unavailable.
 * Scores (0-100) represent risk, derived from the source CSVs.
 */
@Service
public class MockDataService {

    public static final List<TierInfo> TIERS = List.of(
            new TierInfo("POWER", "Power", "Power grid and energy supply indicators"),
            new TierInfo("WATER", "Water", "Water stress and groundwater indicators"),
            new TierInfo("CLIMATE", "Climate & Seismic", "Climate and seismic indicators"),
            new TierInfo("REGULATORY", "Regulatory", "Policy and approval indicators"),
            new TierInfo("INFRASTRUCTURE", "Infrastructure", "Transport, connectivity, and land indicators"));

    private static Map<String, Double> scores(double power, double water, double climate, double regulatory, double infra) {
        Map<String, Double> m = new LinkedHashMap<>();
        m.put("POWER", power);
        m.put("WATER", water);
        m.put("CLIMATE", climate);
        m.put("REGULATORY", regulatory);
        m.put("INFRASTRUCTURE", infra);
        return m;
    }

    public List<CityRiskProfile> cities() {
        return List.of(
                city("IN-MH-MUM", "Mumbai", "Maharashtra", 19.0760, 72.8777,
                        scores(20, 30, 60, 25, 35)),
                city("IN-TN-CHE", "Chennai", "Tamil Nadu", 13.0827, 80.2707,
                        scores(70, 85, 70, 35, 45)),
                city("IN-TS-HYD", "Hyderabad", "Telangana", 17.3850, 78.4867,
                        scores(55, 65, 45, 50, 55)),
                city("IN-KA-BLR", "Bengaluru", "Karnataka", 12.9716, 77.5946,
                        scores(55, 90, 40, 45, 60)),
                city("IN-UP-NOI", "Noida", "Uttar Pradesh", 28.5355, 77.3910,
                        scores(35, 75, 65, 40, 50)));
    }

    private CityRiskProfile city(String id, String name, String state, double lat, double lng,
                                 Map<String, Double> scores) {
        double csti = round(scores.values().stream().mapToDouble(Double::doubleValue).average().orElse(0));
        return new CityRiskProfile(id, name, state, lat, lng, csti, tierFor(csti), scores);
    }

    public String tierFor(double csti) {
        if (csti < 36) return "Tier 1";
        if (csti < 56) return "Tier 2";
        if (csti < 76) return "Tier 3";
        return "Tier 4";
    }

    private double round(double v) {
        return Math.round(v * 10.0) / 10.0;
    }
}