package com.edu.lms.exception;

public class CardNotFoundException extends RuntimeException {
    
    public CardNotFoundException(String massage){
        super(massage);
    }
}
