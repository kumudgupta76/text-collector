package com.kg.textcollector.exceptions;

import org.springframework.http.HttpStatus;

public class BaseException extends RuntimeException {
    private HttpStatus status = null;

    private Object data = null;

    public HttpStatus getStatus() {
        return status;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public BaseException() {
        super();
    }

    public BaseException(
            String message
    ) {
        super(message);
    }

    public BaseException(
            HttpStatus status,
            String message
    ) {
        this(message);
        this.status = status;
    }

    public BaseException(
            HttpStatus status,
            String message,
            Object data
    ) {
        this(
                status,
                message
        );
        this.data = data;
    }
}