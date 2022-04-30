package com.kg.textcollector.repositories;

import com.kg.textcollector.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NoteRepository extends JpaRepository<Note, Integer> {
    List<Note> findByUserId(int id);

    Optional<Note> findByIdAndUserId(Integer id, int id1);
}
