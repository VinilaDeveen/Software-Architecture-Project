package com.edu.lms.exception;

public class InvalidDocumentException extends RuntimeException{
    public InvalidDocumentException(String message){
        super(message);
    }
}