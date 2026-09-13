package threatassesment.javabackend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import threatassesment.javabackend.dto.CityRiskProfile;
import threatassesment.javabackend.dto.DashboardSummary;
import threatassesment.javabackend.service.RiskAssessmentService;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final RiskAssessmentService service;

    public DashboardController(RiskAssessmentService service) {
        this.service = service;
    }

    @GetMapping("/summary")
    public DashboardSummary summary() {
        return service.getSummary();
    }

    @GetMapping("/cities")
    public List<CityRiskProfile> cities() {
        return service.getSummary().cities();
    }

    @GetMapping("/cities/{id}")
    public CityRiskProfile city(@PathVariable String id) {
        return service.getSummary().cities().stream()
                .filter(c -> c.id().equalsIgnoreCase(id))
                .findFirst()
                .orElse(null);
    }
}