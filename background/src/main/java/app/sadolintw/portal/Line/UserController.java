package app.sadolintw.portal.Line;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    //Auth URL: https://notify-bot.line.me/oauth/authorize
    //Access Token URL: https://notify-bot.line.me/oauth/token
    //Resource Line Notify: https://notify-api.line.me/api/notify
    @GetMapping("hello")
    public String getHello(){
        return "hello";
    }
}
