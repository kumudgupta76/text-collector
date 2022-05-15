package com.kg.textcollector.repositories;

import com.kg.textcollector.model.Label;
import com.kg.textcollector.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NoteRepository extends JpaRepository<Note, Integer> {
    List<Note> findByUserIdOrderByCreatedAtDesc(Long id);

    Optional<Note> findByIdAndUserId(Long id, Long id1);

    List<Note> findByTitleContainingOrDataContainingAndUserIdOrderByCreatedAtDesc(String queryTitle, String queryData, Long id);

    List<Note> findByTitleContainingAndUserIdOrDataContainingAndUserIdOrderByCreatedAtDesc(String queryTitle, Long id1, String queryData, Long id2);
    List<Label> findLabelsById(Long id);
}
