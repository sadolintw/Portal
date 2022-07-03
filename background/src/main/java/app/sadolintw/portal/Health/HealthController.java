package app.sadolintw.portal.Health;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/health")
@CrossOrigin
public class HealthController {
    
    @GetMapping("readiness")
    public String readiness() {
        return "ok";
    }

    @GetMapping("liveness")
    public String liveness() {
        return "ok";
    }
}
