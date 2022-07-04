package app.sadolintw.portal.Line;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@RestController
@RequestMapping("api/line_login")
@CrossOrigin
public class LineLoginController {
    // {
    //     "issuer": "https://access.line.me",
    //     "authorization_endpoint": "https://access.line.me/oauth2/v2.1/authorize",
    //     "token_endpoint": "https://api.line.me/oauth2/v2.1/token",
    //     "revocation_endpoint": "https://api.line.me/oauth2/v2.1/revoke",
    //     "userinfo_endpoint": "https://api.line.me/oauth2/v2.1/userinfo",
    //     "scopes_supported": ["openid", "profile", "email"],
    //     "jwks_uri": "https://api.line.me/oauth2/v2.1/certs",
    //     "response_types_supported": ["code"],
    //     "subject_types_supported": ["pairwise"],
    //     "id_token_signing_alg_values_supported": ["ES256"],
    //     "code_challenge_methods_supported": ["S256"]
    // }

    public String redirectUri = "http://localhost:3000";

    @GetMapping("getAccessToken")
    public String getAccessToken(
        @RequestParam(name="code") String code,
        @RequestParam(name="client_id") String clientId
    ) {
        System.out.println("code:"+code);
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> payload = new LinkedMultiValueMap<String, String>();
        payload.add("grant_type", "authorization_code");
        payload.add("code", code);
        payload.add("redirect_uri", redirectUri);
        payload.add("client_secret", System.getenv("LINE_LOGIN_CLIENT_SECRET"));
        payload.add("client_id", clientId);

        HttpEntity<?> httpEntity = new HttpEntity<>(payload, headers);
        ResponseEntity<String> responseEntity;
        String response;
        try{
            responseEntity = restTemplate.exchange("https://api.line.me/oauth2/v2.1/token", HttpMethod.POST, httpEntity, String.class);
            response = responseEntity.getBody();
            System.out.println("response " + response);

            JsonObject json = JsonParser.parseString(response).getAsJsonObject();
            String accessToken = json.get("access_token").toString();
            System.out.println(accessToken);

            return accessToken;
        }catch(RestClientException e){
            e.printStackTrace();
            System.out.println("detail " + e.getMessage());
        }
        
        return null;
    }
}
