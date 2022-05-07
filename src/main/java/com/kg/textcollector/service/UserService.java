package com.kg.textcollector.service;

import com.kg.textcollector.exceptions.CustomException;
import com.kg.textcollector.model.User;
import com.kg.textcollector.model.UserDetail;
import com.kg.textcollector.repositories.UserRepository;
import io.jsonwebtoken.impl.AbstractTextCodec;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByUsername(username);

        user.orElseThrow(() -> new UsernameNotFoundException("Not found : " + username));

        return user.map(UserDetail::new).get();
    }

    public UserDetail save(User user) {
        Optional<User> userByEmail = userRepository.findByEmail(user.getEmail());
        if(userByEmail.isPresent()) {
            throw new CustomException(HttpStatus.CONFLICT, "User already exists with email:"+ user.getEmail());
        }
        Optional<User> userByUsername = userRepository.findByUsername(user.getUsername());
        if(userByUsername.isPresent()) {
            throw new CustomException(HttpStatus.CONFLICT, "User already exists with username:"+ user.getUsername());
        }

        user = userRepository.save(user);
        return new UserDetail(user);
    }

    public UserDetail getUser(String usernameOrEmail) {
        Optional<User> user = userRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail);

        return (user.isPresent() ? user.map(UserDetail::new).get() : null);
    }

    public List<UserDetail> getAll() {
        return userRepository.findAll().stream().map(UserDetail::new).collect(Collectors.toList());
    }

    public UserDetail find(Integer id) {
        return new UserDetail(userRepository.getById(id));
    }
}
