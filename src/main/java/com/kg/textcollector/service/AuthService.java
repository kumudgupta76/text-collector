package com.kg.textcollector.service;

import com.kg.textcollector.exceptions.CustomException;
import com.kg.textcollector.model.User;
import com.kg.textcollector.model.UserDetail;
import com.kg.textcollector.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserService userService;


    @Autowired
    private JwtUtil jwtTokenUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserDetail login(String usernameOrEmail, String password) {
        UserDetail userDetail = userService.getUser(usernameOrEmail);
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userDetail.getUsername(), password)
            );
        }
        catch (BadCredentialsException e) {
            throw new CustomException("Incorrect username or password");
        }
        final String jwt = jwtTokenUtil.generateToken(userDetail);
        userDetail.setToken(jwt);

        return userDetail;
    }

    public UserDetail signup(User user) {
        String password = user.getPassword();
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        UserDetail userDetail = userService.save(user);
        return login(user.getUsername(), password);
    }
}
