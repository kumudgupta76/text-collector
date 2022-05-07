package com.kg.textcollector.controller;

import com.kg.textcollector.model.UserDetail;
import com.kg.textcollector.service.UserService;
import com.kg.textcollector.transformer.UserTranformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.stream.Collectors;

@Controller
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping(path = "users")
    public @ResponseBody
    List<UserTranformer> getAllUsers() {
        // This returns a JSON or XML with the users
        return userService.getAll().stream().map(UserTranformer::new).collect(Collectors.toList());
    }

    @GetMapping(path = "/user")
    public @ResponseBody
    UserTranformer getUser(@RequestParam String usernameOrEmail) {
        UserDetail userDetail = userService.getUser(usernameOrEmail);
        if(userDetail == null) {
            return null;
        }
        return new UserTranformer(userDetail);

    }

    @GetMapping(path = "/user/{id}")
    public @ResponseBody
    UserTranformer find(@PathVariable Integer id) {
        return new UserTranformer(userService.find(id));
    }
}
