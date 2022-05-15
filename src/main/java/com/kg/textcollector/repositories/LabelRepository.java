package com.kg.textcollector.repositories;

import com.kg.textcollector.model.Label;
import com.kg.textcollector.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LabelRepository extends JpaRepository<Label, Integer> {
    List<Label> findByUserIdOrderByCreatedAtDesc(Long id);

    Optional<Label> findByIdAndUserId(Long id, Long id1);

    List<Label> findByUserIdAndNameContainingOrderByCreatedAtDesc(Long id, String queryTitle);

    List<Note> findNoteById(Long id);
}
