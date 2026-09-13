package threatassesment.javabackend.client;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

/**
 * Lightweight client for the upstream HyperScale DataCenter OpenData API.
 * Returns raw JSON so the assessment service can parse what it needs without
 * coupling to upstream DTO classes.
 */
@Component
public class OpenDataApiClient {

    private final RestTemplate restTemplate;

    @Value("${app.opendata.base-url}")
    private String baseUrl;

    public OpenDataApiClient(RestTemplate openDataRestTemplate) {
        this.restTemplate = openDataRestTemplate;
    }

    public JsonNode fetchList(String resource) {
        String url = baseUrl + "/" + resource;
        try {
            return restTemplate.getForObject(url, JsonNode.class);
        } catch (RestClientException e) {
            return null;
        }
    }

    public JsonNode fetchLocations() {
        return fetchList("locations?size=20");
    }

    public JsonNode fetchTiers() {
        return fetchList("tiers?size=20");
    }

    public JsonNode fetchIndicators() {
        return fetchList("indicators?size=100");
    }

    public JsonNode fetchObservations(String locationId) {
        return fetchList("observations?location=" + locationId + "&size=100");
    }
}