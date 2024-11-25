package com.edu.lms.exception;

public class DocumentAlreadyExistsException extends RuntimeException {

    public  DocumentAlreadyExistsException(String message){
        super(message);
    }
}
