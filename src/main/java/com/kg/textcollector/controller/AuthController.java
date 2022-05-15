package com.kg.textcollector.controller;

import com.kg.textcollector.model.User;
import com.kg.textcollector.model.UserDetail;
import com.kg.textcollector.service.AuthService;
import com.kg.textcollector.transformer.AuthenticationRequest;
import com.kg.textcollector.transformer.UserTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.validation.Valid;

@Controller
@RequestMapping(path = "/auth")
public class AuthController {

    @Autowired
    private AuthService authService;


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {

        UserTransformer userTransformer = new UserTransformer(
                authService.login(
                        authenticationRequest.getUsername(),
                        authenticationRequest.getPassword()
                )
        );
        return ResponseEntity.ok(userTransformer);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody User user) throws Exception {
        UserTransformer userTransformer = new UserTransformer(authService.signup(user));
        return ResponseEntity.ok(userTransformer);
    }

    @GetMapping("/test")
    public ResponseEntity<?> test() {
        return ResponseEntity.ok("This is testing url");
    }
}
