package com.kg.textcollector.service;

import com.kg.textcollector.model.Label;
import com.kg.textcollector.model.UserDetail;
import com.kg.textcollector.repositories.LabelRepository;
import com.kg.textcollector.util.Auth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class LabelService {

    @Autowired
    private LabelRepository labelRepository;

    public Label save(Label label) {
        return labelRepository.save(label);
    }

    public Label getById(Long id) {
        Optional<UserDetail> user = Auth.getCurrentUserLogin();
        Label label = null;
        if(user.isPresent()) {
            Optional<Label> resultLabel = labelRepository.findByIdAndUserId(id, user.get().getId());
            label = resultLabel.isPresent() ? resultLabel.get() : null;
        }
        return label;
    }

    public List<Label> all() {
        Optional<UserDetail> user = Auth.getCurrentUserLogin();
        if(user.isPresent()) {
            return labelRepository.findByUserIdOrderByCreatedAtDesc(user.get().getId());
        }
        return new ArrayList<>();
    }

    public List<Label> search(String query) {
        Optional<UserDetail> user = Auth.getCurrentUserLogin();
        if(user.isPresent()) {
            return labelRepository.findByUserIdAndNameContainingOrderByCreatedAtDesc(user.get().getId(), query);
        }
        return new ArrayList<>();
    }
}
