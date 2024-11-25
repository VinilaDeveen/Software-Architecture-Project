package com.edu.lms.service;

import com.edu.lms.entity.Card;

import java.util.List;
import java.util.Optional;

public interface CardService {

    public List<Card> getAllCard();
    public Optional<Card> getcard(String id);
    public Card createCard(Card card);
    public Card updateCard(Card card);
    public void deleteAllCard();
    public void deletcard(int id);

}
