package com.edu.lms.service.impl;

import com.edu.lms.entity.Card;
import com.edu.lms.exception.NoDataFoundExeption;
import com.edu.lms.repository.CardRepo;
import com.edu.lms.service.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CardServiceImpl implements CardService{
    @Autowired
    private CardRepo cardRepo;

    @Override
    public List<Card> getAllCard() {
        List<Card> getAllCard = cardRepo.findAll();
        if (getAllCard.isEmpty()) {
            throw new NoDataFoundExeption("No Card Detail Available");
        } else  {
             return getAllCard;
        }}
    @Override
    public Optional<Card> getcard(String id) {
        Optional<Card> card=cardRepo.findByCardId(id);
        if (card.isPresent()){
            return card;
        }
        else {
         throw new NoDataFoundExeption("No detail avilable");}
    }
    @Override
    public Card createCard(Card card){
        return cardRepo.save(card);
    }
    @Override
    public Card updateCard(Card card){
        
        return cardRepo.save(card);
    }
    @Override
    public void deleteAllCard(){
        cardRepo.deleteAll();
    }
    @Override
    public void deletcard(int id){
        cardRepo.deleteById(id);
    }
}