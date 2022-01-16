package com.kg.textcollector.service;

import com.kg.textcollector.model.Note;
import com.kg.textcollector.repositories.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class NoteService {

    @Autowired
    private NoteRepository noteRepository;

    public Note save(Note note) {


        return noteRepository.save(note);
    }

    public Note getById(Integer id) {
        Optional<Note> note = noteRepository.findById(id);
        return note.isPresent() ? note.get() : null;
    }
}
