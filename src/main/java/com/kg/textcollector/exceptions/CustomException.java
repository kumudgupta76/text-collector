package com.kg.textcollector.exceptions;

import org.springframework.http.HttpStatus;

public class CustomException extends BaseException {
    public CustomException() {
    }

    public CustomException(String message) {
        super(message);
    }

    public CustomException(HttpStatus status, String message) {
        super(status, message);
    }

    public CustomException(HttpStatus status, String message, Object data) {
        super(status, message, data);
    }
}
