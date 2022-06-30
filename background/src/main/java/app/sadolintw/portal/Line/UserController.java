package app.sadolintw.portal.Line;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("api")
public class UserController {
    //Auth URL: https://notify-bot.line.me/oauth/authorize
    //Access Token URL: https://notify-bot.line.me/oauth/token
    //Resource Line Notify: https://notify-api.line.me/api/notify
    @GetMapping("hello")
    public String getHello(){
        return "hello";
    }

    @GetMapping("getAccessToken")
    public String getAccessToken(String code, String state){
        System.out.println("code:"+code+" state:"+state);
        RestTemplate restTemplate = new RestTemplate();

        

        return "access_token";
    }
}
