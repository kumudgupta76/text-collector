package com.kg.textcollector.controller;

import com.kg.textcollector.exceptions.NotFoundException;
import com.kg.textcollector.model.Label;
import com.kg.textcollector.model.User;
import com.kg.textcollector.model.UserDetail;
import com.kg.textcollector.service.LabelService;
import com.kg.textcollector.util.Auth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequestMapping(path = "/label")
public class LabelController {

    @Autowired
    private LabelService labelService;

    @PostMapping(path = "/add")
    public @ResponseBody Label save(@RequestBody Label label) {
        Optional<UserDetail> user = Auth.getCurrentUserLogin();
        if(user.isPresent()) {
            label.setUser(new User(user.get()));
        }
        return labelService.save(label);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<?> get(@PathVariable Long id) {
        Label label = labelService.getById(id);
        if(label == null) {
            throw new NotFoundException("Label not found with id : "+ id);
        }
        return ResponseEntity.ok(label);
    }

    @GetMapping(path = "")
    public ResponseEntity<?> all(@RequestParam String query) {
        return ResponseEntity.ok(labelService.search(query));
    }
}
