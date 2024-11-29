package com.edu.lms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edu.lms.dto.MonthlyFeeCardDTO;
import com.edu.lms.entity.MonthlyFeeCard;
import com.edu.lms.service.MonthlyFeeCardService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/v1/monthlyFeeCards")
@RequiredArgsConstructor
public class MonthlyFeeCardController {

    @Autowired
    private MonthlyFeeCardService monthlyFeeCardService;

    @PostMapping("")
    public ResponseEntity<MonthlyFeeCard> createMonthlyFeeCard(@RequestBody MonthlyFeeCardDTO dto) {
        MonthlyFeeCard card = monthlyFeeCardService.createMonthlyFeeCard(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(card);
    }

    @PutMapping("/{cardId}")
    public ResponseEntity<MonthlyFeeCard> updateMonthlyFeeCard(
            @PathVariable Long cardId, 
            @RequestBody MonthlyFeeCardDTO dto) {
        MonthlyFeeCard card = monthlyFeeCardService.updateMonthlyFeeCard(cardId, dto);
        return ResponseEntity.ok(card);
    }

    @PutMapping("/attendence/{cardId}")
    public ResponseEntity<MonthlyFeeCard> updateAttendence(
            @PathVariable Long cardId, 
            @RequestBody MonthlyFeeCardDTO dto) {
        MonthlyFeeCard card = monthlyFeeCardService.updateAttentence(cardId, dto);
        return ResponseEntity.ok(card);
    }

    @GetMapping("/{cardId}")
    public MonthlyFeeCard getMonthlyCardById(@PathVariable Long cardId) {
        return monthlyFeeCardService.getCardsById(cardId);
    }
    

    @GetMapping("/student/{studId}")
    public ResponseEntity<List<MonthlyFeeCard>> getCardsByStudentId(@PathVariable Long studId) {
        return ResponseEntity.ok(monthlyFeeCardService.getCardsByStudentId(studId));
    }

    @DeleteMapping("/{cardId}")
    public ResponseEntity<Void> deleteMonthlyFeeCard(@PathVariable Long cardId) {
        monthlyFeeCardService.deleteMonthlyFeeCard(cardId);
        return ResponseEntity.noContent().build();
    }
}

