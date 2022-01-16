package com.kg.textcollector.repositories;

import com.kg.textcollector.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<Note, Integer> {
}
