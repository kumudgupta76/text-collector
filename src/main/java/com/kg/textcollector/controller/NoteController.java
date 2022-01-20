package com.kg.textcollector.controller;

import com.kg.textcollector.model.Note;
import com.kg.textcollector.model.UserDetail;
import com.kg.textcollector.service.NoteService;
import com.kg.textcollector.util.Auth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequestMapping(path = "/note")
public class NoteController {

    @Autowired
    private NoteService noteService;

    @PostMapping(path = "/add")
    public @ResponseBody Note save(@RequestBody Note note) {
        Optional<UserDetail> user = Auth.getCurrentUserLogin();
        if(user.isPresent()) {
            note.setUserId(user.get().getId());
        }
        return noteService.save(note);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<?> get(@PathVariable Integer id) {
        Note note = noteService.getById(id);
        return ResponseEntity.ok(note.getData());
    }
}
