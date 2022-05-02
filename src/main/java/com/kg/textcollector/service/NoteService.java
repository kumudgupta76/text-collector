package com.kg.textcollector.service;

import com.kg.textcollector.model.Note;
import com.kg.textcollector.model.UserDetail;
import com.kg.textcollector.repositories.NoteRepository;
import com.kg.textcollector.util.Auth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class NoteService {

    @Autowired
    private NoteRepository noteRepository;

    public Note save(Note note) {


        return noteRepository.save(note);
    }

    public Note getById(Integer id) {
        Optional<UserDetail> user = Auth.getCurrentUserLogin();
        Note note = null;
        if(user.isPresent()) {
            Optional<Note> resultNote = noteRepository.findByIdAndUserId(id, user.get().getId());
            note = resultNote.isPresent() ? resultNote.get() : null;
        }
        return note;
    }

    public List<Note> all() {
        Optional<UserDetail> user = Auth.getCurrentUserLogin();
        if(user.isPresent()) {
            return noteRepository.findByUserIdOrderByCreatedAtDesc(user.get().getId());
        }
        return new ArrayList<>();
    }
}
