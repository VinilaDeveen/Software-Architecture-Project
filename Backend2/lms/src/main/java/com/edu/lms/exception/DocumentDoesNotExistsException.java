package com.edu.lms.exception;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class DocumentDoesNotExistsException extends RuntimeException{
    public DocumentDoesNotExistsException(String message){
        super(message);
    }
}
