package com.kg.textcollector.exceptions;

import org.springframework.http.HttpStatus;

public class NotFoundException extends BaseException{
    public NotFoundException() {
        this.setStatus(HttpStatus.NOT_FOUND);
    }

    public NotFoundException(String message) {
        super(message);
        this.setStatus(HttpStatus.NOT_FOUND);
    }
}
