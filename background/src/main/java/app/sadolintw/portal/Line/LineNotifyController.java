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
@RequestMapping("api/line_notify")
@CrossOrigin
public class LineNotifyController {
    //Auth URL: https://notify-bot.line.me/oauth/authorize
    //Access Token URL: https://notify-bot.line.me/oauth/token
    //Resource Line Notify: https://notify-api.line.me/api/notify

    // public String redirectUri = "https://portal.sadolintw.app";
    public String redirectUri = "http://localhost:3000";


    @GetMapping("getAccessToken")
    public String getAccessToken(
        @RequestParam(name="code") String code,
        @RequestParam(name="client_id") String clientId
        // @RequestParam(name="client_secret") String clientSecret
    ){
        System.out.println("code:"+code);
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        // headers.add();
        MultiValueMap<String, String> payload = new LinkedMultiValueMap<String, String>();
        payload.add("grant_type", "authorization_code");
        payload.add("code", code);
        payload.add("redirect_uri", redirectUri);
        // payload.add("client_id", System.getenv("CLIENT_ID"));
        payload.add("client_secret", System.getenv("LINE_NOTIFY_CLIENT_SECRET"));
        payload.add("client_id", clientId);
        // payload.add("client_secret", clientSecret);
        HttpEntity<?> httpEntity = new HttpEntity<>(payload, headers);
        ResponseEntity<String> responseEntity;
        String response;
        try{
            responseEntity = restTemplate.exchange("https://notify-bot.line.me/oauth/token", HttpMethod.POST, httpEntity, String.class);
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

    @GetMapping("sendNotification")
    public String sendNotification(
        @RequestParam(name = "message") String message,
        @RequestParam(name = "access_token") String accessToken
    ){
        System.out.println("notification " + message + " access_token " + accessToken);
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.add("Authorization", "Bearer " + accessToken);
        MultiValueMap<String, String> payload = new LinkedMultiValueMap<String, String>();
        payload.add("message", message);
        HttpEntity<?> httpEntity = new HttpEntity<>(payload, headers);
        ResponseEntity<String> responseEntity;
        String response;
        try{
            responseEntity = restTemplate.exchange("https://notify-api.line.me/api/notify", HttpMethod.POST, httpEntity, String.class);
            response = responseEntity.getBody();
            System.out.println("response " + response);

            return response;
        }catch(RestClientException e){
            e.printStackTrace();
            System.out.println("detail " + e.getMessage());
        }
        
        return null;
    }

}
