package com.edu.lms.controller;

import com.edu.lms.entity.Card;
import com.edu.lms.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "api/v1/card")
@CrossOrigin

public class CardController {
    @Autowired
    private CardService cardService;
    @GetMapping
    public List<Card> getAllCard(){
        return cardService.getAllCard();
    }
    @GetMapping("/{id}")
    public Optional<Card> getCard(@PathVariable String id){
        return cardService.getcard(id);
    }
    @PostMapping
    public Card createCard(@RequestBody Card card){
        return cardService.createCard(card);
    }

    @PutMapping
    public Card updateCard(@RequestBody Card card){
        return cardService.updateCard(card);
    }
    @DeleteMapping
    public void  deleteAllCard( ){
        cardService.deleteAllCard();
    }
    @DeleteMapping("{id}")
    public void deletecard(@PathVariable int id){
        cardService.deletcard(id);
    }


}
