package com.edu.lms.exception;

import lombok.NoArgsConstructor;


@NoArgsConstructor
public class DocumentWithUrlAlreadyExistsException extends RuntimeException{

    public DocumentWithUrlAlreadyExistsException(String message){
        super(message);
    }
}
