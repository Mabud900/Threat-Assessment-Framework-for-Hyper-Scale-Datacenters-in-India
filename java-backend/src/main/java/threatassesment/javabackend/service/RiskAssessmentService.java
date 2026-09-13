package threatassesment.javabackend.service;

import org.springframework.stereotype.Service;
import threatassesment.javabackend.client.OpenDataApiClient;
import threatassesment.javabackend.dto.CityRiskProfile;
import threatassesment.javabackend.dto.DashboardSummary;
import threatassesment.javabackend.dto.TierInfo;

import java.util.List;

/**
 * Builds the dashboard summary. When the upstream OpenData API responds, tier
 * metadata is sourced from it; city risk profiles fall back to curated mock
 * data if the upstream returns nothing (keeps the demo stable with the API off).
 */
@Service
public class RiskAssessmentService {

    private final OpenDataApiClient client;
    private final MockDataService mock;

    public RiskAssessmentService(OpenDataApiClient client, MockDataService mock) {
        this.client = client;
        this.mock = mock;
    }

    public DashboardSummary getSummary() {
        List<TierInfo> tiers = resolveTiers();
        List<CityRiskProfile> cities = resolveCities();
        return new DashboardSummary(cities, tiers);
    }

    private List<TierInfo> resolveTiers() {
        var node = client.fetchTiers();
        if (node != null && node.has("content") && node.get("content").isArray()) {
            var out = new java.util.ArrayList<TierInfo>();
            for (var t : node.get("content")) {
                String code = t.path("code").asText();
                String name = t.path("name").asText();
                String desc = t.path("description").asText();
                if (!code.isEmpty()) {
                    out.add(new TierInfo(code, name, desc));
                }
            }
            if (!out.isEmpty()) {
                return out;
            }
        }
        return MockDataService.TIERS;
    }

    private List<CityRiskProfile> resolveCities() {
        var locs = client.fetchLocations();
        if (locs == null || !locs.has("content") || locs.get("content").isEmpty()) {
            return mock.cities();
        }
        // Upstream is reachable. For the demo we still rely on curated scores until
        // full per-indicator scoring is wired to the PDF weights.
        return mock.cities();
    }
}